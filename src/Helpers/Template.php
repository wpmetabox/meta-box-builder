<?php
namespace MBB\Helpers;

use MBB\LocalJson;

class Template {
    public static function render_diff_dialog() {
		if ( ! LocalJson::is_enabled() ) {
			return;
		}
		?>
		<dialog id="mbb-diff-dialog">
			<div class="mbb-diff-dialog-wrapper">
				<header>
					<h2 tabindex="0"><?php esc_html_e( 'Review changes', 'meta-box-builder' ) ?></h2>
					<button id="mbb-diff-dialog-close" class="button-link" role="button">&times;</button>
				</header>

				<div class="mbb-diff-dialog-main">
					<div class="mbb-diff-dialog-button-group" data-split-views="true">
						<div>
							<h3><?php esc_html_e( 'Database Version', 'meta-box-builder' ) ?></h3>
							<button type="button" role="button" class="button-sync" data-use="database">
								<?php esc_html_e( 'Use Database', 'meta-box-builder' ) ?>
							</button>
						</div>

						<div>
							<h3><?php esc_html_e( 'JSON File Version', 'meta-box-builder' ) ?></h3>
							<button type="button" role="button" class="button-sync" data-use="json">
								<?php esc_html_e( 'Use JSON File', 'meta-box-builder' ) ?>
							</button>
						</div>
					</div>

					<div class="mbb-diff-dialog-content"></div>

					<template id="sync-success">
						<div class="sync-success-wrapper">
							<div class="sync-success-content">
								<p><?= esc_html__( 'All changes synced!', 'meta-box-builder' ) ?></p>
							</div>
						</div>
					</template>

					<template id="sync-error">
						<div class="sync-error-wrapper">
							<div class="sync-error-content">
								<p><?= esc_html__( 'Error during syncing data, please check folder permission or file format!', 'meta-box-builder' ) ?>
								</p>
							</div>
						</div>
					</template>

					<template id="no-changes">
						<section class="no-changes-content">
							<p><?= esc_html__( 'No changes detected.', 'meta-box-builder' ) ?></p>
						</section>
					</template>
				</div>
				<footer>
					<button id="mbb-diff-dialog-close-btn" class="button button-secondary">
						<?= esc_html__( 'Close', 'meta-box-builder' ) ?>
					</button>
				</footer>
			</div>
		</dialog>
		<?php
	}
}