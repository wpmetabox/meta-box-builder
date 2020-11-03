<?php include MBB_DIR . 'views/settings/conditional-logic.php'; ?>

<h2 ng-show="tabExists"><?php esc_html_e( 'Tabs', 'meta-box-builder' ); ?></h3>
<table class="form-table" ng-show="tabExists">
	<tr>
		<th><?php esc_html_e( 'Tabs style', 'meta-box-builder' ); ?></th>
		<td>
			<select ng-model="meta.tab_style">
				<option value="default"><?php esc_html_e( 'Default', 'meta-box-builder' ); ?></option>
				<option value="box"><?php esc_html_e( 'Box', 'meta-box-builder' ); ?></option>
				<option value="left"><?php esc_html_e( 'Left', 'meta-box-builder' ); ?></option>
			</select>
		</td>
	</tr>
	<tr>
		<th><?php esc_html_e( 'Show meta box wrapper', 'meta-box-builder' ); ?></th>
		<td><input type="checkbox" ng-model="meta.tab_wrapper" ng-true-value="'true'" ng-false-value="'false'"></td>
	</tr>
</table>

<p><button class="button button-primary"><?php esc_html_e( 'Save Changes', 'meta-box-builder' ); ?></button></p>
