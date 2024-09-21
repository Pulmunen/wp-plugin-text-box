import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	RichText, 
	BlockControls, 
	AlignmentToolbar, 
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	withColors,
	getColorClassName 
 } from '@wordpress/block-editor';

 import classnames from 'classnames'

import './editor.scss';

function Edit( props ) {
	const {
		attributes,
		setAttributes, 
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
		customBackgroundColor, 
		customTextColor
	} = props

	const { text, alignment} = attributes;

	const backgroundClass = getColorClassName(
		"background-color", 
		backgroundColor)

		const textClass = getColorClassName(
			"color", 
			textColor)

		const classes = classnames(`text-box-align-${alignment}`,{
			[textClass]:textClass,
			[backgroundClass]:backgroundClass
		})
	
		const onChangeAlignment=(newAlignment)=>{
			setAttributes({alignment:newAlignment})
		}

	const onChangeText=(newText)=>{
		setAttributes({text:newText})
	}

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
									title={__("Colour settings",'text-box')}
									// icon="admin-appearance"
									initialOpen
									disableCustomColors={false}
									colorSettings={[
										{
											value:backgroundColor.color,
											onChange:setBackgroundColor,
											label:__("Background colour","text-box")
										},
										{
											value:textColor.color,
											onChange:setTextColor,
											label:__("Text colour","text-box")
										}
									]}>
					<ContrastChecker
						textColor={textColor.color}
						backgroundColor={backgroundColor.color}
					/>
				</PanelColorSettings>

			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					onChange={onChangeAlignment}
					value={alignment}
				/>
			</BlockControls>
			<RichText
				{ ...useBlockProps({
					className:classes,
					style:{
						backgroundColor: backgroundClass ? undefined:customBackgroundColor,
						color:textClass ? undefined : customTextColor
					}
				}) 
			}
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'text-box' ) }
				tagName="h4"
				allowedFormats={ [ 'core/bold' ] }

			/>
		</>
	);
}

export default withColors({
	backgroundColor:"backgroundColor",
	textColor:"color"
})(Edit)