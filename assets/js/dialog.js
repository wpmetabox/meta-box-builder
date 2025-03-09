const showDialog = async ( mbbId ) => {
    const syncData = await wp.apiFetch( {
        path: '/mbb/json-data?id=' + mbbId,
        method: 'GET',
    } );

    const dialog = document.getElementById( 'mbb-diff-dialog' );
    dialog.querySelector( '.mbb-diff-dialog-content' ).innerHTML = syncData[ mbbId ].diff;

    if ( syncData[ mbbId ].diff === '' ) {
        dialog.querySelector( '.mbb-diff-dialog-content' )
            .appendChild( document.getElementById( 'no-changes' ).content.cloneNode( true ) );
    }

    dialog.querySelectorAll( '.button-sync' ).forEach( btnSync => {
        const use = btnSync.dataset.use;
        if ( use === 'database' && syncData[ mbbId ].remote === null ) {
            btnSync.disabled = true;
        }

        if ( use === 'json' && syncData[ mbbId ].local === null ) {
            btnSync.disabled = true;
        }

        btnSync.dataset.id = mbbId;
    } );
    dialog.showModal();
};

document.querySelectorAll( '[data-dialog]' ).forEach( button => {
    button.addEventListener( 'click', async () => {
        await showDialog( button.dataset.dialog );
    } );
} );

// Dialog for diff
document.querySelector( '#mbb-diff-dialog-close' ).addEventListener( 'click', () => {
    document.querySelector( '#mbb-diff-dialog' ).close();
} );

document.querySelector( '#mbb-diff-dialog-close-btn' ).addEventListener( 'click', () => {
    document.querySelector( '#mbb-diff-dialog' ).close();
} );

// Escape key to close dialog
document.addEventListener( 'keydown', ( e ) => {
    if ( e.key === 'Escape' ) {
        document.querySelector( '#mbb-diff-dialog' ).close();
    }
} );

// Click outside to close dialog
document.querySelector( '#mbb-diff-dialog' ).addEventListener( 'click', ( e ) => {
    if ( e.target === document.querySelector( '#mbb-diff-dialog' ) ) {
        document.querySelector( '#mbb-diff-dialog' ).close();
    }
} );

// AJAX action to run sync
document.querySelectorAll( '.button-sync' ).forEach( buttonSync => {
    buttonSync.addEventListener( 'click', async ( e ) => {
        e.preventDefault();
        const previousText = buttonSync.textContent;

        // Set the button to loading state
        buttonSync.classList.add( 'loading' );
        buttonSync.disabled = true;
        buttonSync.textContent = MBB.syncing;

        const data = await wp.apiFetch( {
            path: '/mbb/set-json-data',
            method: 'PUT',
            data: {
                id: buttonSync.dataset.id,
                use: buttonSync.dataset.use,
            }
        } );

        if ( data.success ) {
            const templateSyncSuccess = document.querySelector( '#sync-success' ).content.cloneNode( true );

            // Update the diff section
            document.querySelector( '.mbb-diff-dialog-content' ).innerHTML = templateSyncSuccess.querySelector( 'div' ).innerHTML;

            // Update status of current row sync to synced
            const label = document.querySelector( `.mbb-label[data-for-id="${ buttonSync.dataset.id }"]` );
            label.textContent = MBB.synced;
            label.dataset.status = 'synced';
        } else {
            const templateSyncError = document.querySelector( '#sync-error' ).content.cloneNode( true );

            // Update the diff section
            document.querySelector( '.mbb-diff-dialog-content' ).innerHTML = templateSyncError.querySelector( 'div' ).innerHTML;
            // Update status of current row sync to error
            const label = document.querySelector( `.mbb-label[data-for-id="${ buttonSync.dataset.id }"]` );
            label.textContent = MBB.error;
            label.dataset.status = 'error';
        }

        // Reset the button
        buttonSync.classList.remove( 'loading' );
        buttonSync.disabled = false;
        buttonSync.textContent = previousText;

        // Refresh in 1 seconds
        setTimeout( () => {
            location.reload();
        }, 1000 );
    } );
} );