#!/bin/bash

# WordPress Plugin Release Script
# This script automates the release process for WordPress plugins

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1" >&2
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" >&2
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" >&2
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Function to validate version format
validate_version() {
    local version=$1
    if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        print_error "Invalid version format. Please use format: x.y.z (e.g., 1.0.0)"
        return 1
    fi
    return 0
}

# Function to get plugin main file
get_main_file() {
    local plugin_dir=$(basename "$PWD")
    local main_file="$plugin_dir.php"

    if [[ ! -f "$main_file" ]]; then
        print_error "Main plugin file '$main_file' not found!"
        exit 1
    fi

    echo "$main_file"
}

# Function to get previous version from Git tags
get_previous_version() {
    local previous_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
    if [[ -z "$previous_tag" ]]; then
        print_warning "No previous tags found. This appears to be the first release."
        echo ""
    else
        echo "$previous_tag"
    fi
}

# Function to generate changelog
generate_changelog() {
    local version=$1
    local previous_version=$2
    local current_date=$(date +%Y-%m-%d)

    print_status "Generating changelog for version $version..."

    # Create temporary changelog file
    local temp_changelog=$(mktemp)

    echo "### Version $version - $current_date" > "$temp_changelog"
    echo "" >> "$temp_changelog"

    if [[ -n "$previous_version" ]]; then
        print_status "Collecting commits between $previous_version and HEAD..."
        git log --first-parent --pretty=format:"- %s" "$previous_version..HEAD" >> "$temp_changelog"
    else
        print_status "Collecting all commits (first release)..."
        git log --first-parent --pretty=format:"- %s" >> "$temp_changelog"
    fi

    # Open in editor for editing
    print_status "Opening changelog for editing..."
    ${EDITOR:-vim} "$temp_changelog" < /dev/tty > /dev/tty

    # return file path, not contents
    echo "$temp_changelog"
}

# Function to update plugin version
update_plugin_version() {
    local main_file=$1
    local new_version=$2

    print_status "Updating plugin version in $main_file..."

    # Update version line
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/^ \* Version:.*$/ * Version:     $new_version/" "$main_file"
    else
        # Linux
        sed -i "s/^ \* Version:.*$/ * Version:     $new_version/" "$main_file"
    fi

    # Show the updated header block
    print_success "Version updated. Here's the updated header block:"
    echo "----------------------------------------"
    awk '/^ \* Plugin Name:/,/^ \*/' "$main_file"
    echo "----------------------------------------"

    # Ask if user wants to make manual changes
    read -p "Do you want to make manual changes to the file? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Opening file for manual editing..."
        ${EDITOR:-vim} "$main_file" < /dev/tty > /dev/tty
    fi
}

# Function to perform Git operations
perform_git_operations() {
    local version=$1

    print_status "Performing Git operations..."

    # Check if we're in a Git repository
    if [[ ! -d ".git" ]]; then
        print_error "Not in a Git repository!"
        exit 1
    fi

    # Stage modified files
    print_status "Staging modified files..."
    git add --all

    # Show what will be committed
    print_status "Files to be committed:"
    git status --short

    # Confirm commit
    read -p "Proceed with commit? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Commit cancelled."
        exit 1
    fi

    # Commit
    print_status "Committing changes..."
    git commit -m "Version $version"

    # Create tag
    print_status "Creating Git tag $version..."
    git tag "$version"

    # Confirm push
    read -p "Push commit and tag to remote? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Push cancelled. You can push manually later with:"
        echo "  git push origin master"
        echo "  git push origin $version"
        exit 1
    fi

    # Push
    current_branch=$(git rev-parse --abbrev-ref HEAD)
    print_status "Pushing commit to remote branch '$current_branch'..."
    git push origin "$current_branch"

    print_status "Pushing tag to remote..."
    git push origin "$version"

    print_success "Release $version completed successfully!"
}

# Main execution
main() {
    echo "=========================================="
    echo "WordPress Plugin Release Script"
    echo "=========================================="
    echo

    # Check if we're in the right directory
    if [[ ! -f "CHANGELOG.md" ]]; then
        print_error "CHANGELOG.md not found. Please run this script from the plugin root directory."
        exit 1
    fi

    # Get version input
    read -p "Enter version to release (e.g., 1.0.0): " version
    echo

    # Validate version
    if ! validate_version "$version"; then
        exit 1
    fi

    print_success "Version $version is valid."

    # Get main plugin file
    local main_file=$(get_main_file)
    print_status "Main plugin file: $main_file"

    # Get previous version
    local previous_version=$(get_previous_version)
    if [[ -n "$previous_version" ]]; then
        print_status "Previous version: $previous_version"
    fi

    # Confirm release
    echo
    print_warning "About to release version $version"
    if [[ -n "$previous_version" ]]; then
        echo "This will create a release from $previous_version to $version"
    else
        echo "This will be the first release"
    fi
    echo

    read -p "Proceed with release? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Release cancelled."
        exit 1
    fi

    echo

    # Generate changelog
    local changelog_file=$(generate_changelog "$version" "$previous_version")

	# Confirm changelog
    print_status "Generated changelog entry:"
    echo "----------------------------------------"
    cat "$changelog_file"
    echo "----------------------------------------"

    read -p "Proceed with adding this changelog? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Changelog update cancelled."
        rm "$changelog_file"
        exit 1
    fi

    # Add changelog to file
    print_status "Adding changelog to CHANGELOG.md..."
    { cat "$changelog_file"; echo ""; cat CHANGELOG.md; } > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md
    rm "$changelog_file"

    print_success "Changelog added to CHANGELOG.md"

    # Update plugin version
    update_plugin_version "$main_file" "$version"

    # Perform Git operations
    perform_git_operations "$version"

    echo
    print_success "Release $version completed successfully!"
    echo
    print_status "Summary of what was done:"
    echo "1. ✅ Generated changelog for version $version"
    echo "2. ✅ Updated plugin version in $main_file"
    echo "3. ✅ Committed changes with message 'Version $version'"
    echo "4. ✅ Created Git tag $version"
    echo "5. ✅ Pushed commit and tag to remote"
    echo
    print_status "You can now create a release on GitHub using tag $version"
}

# Run main function
main "$@"
