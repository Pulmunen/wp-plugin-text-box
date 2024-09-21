import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json'

const {name} = metadata


console.log("hi")
registerBlockType( name, {
	edit: Edit,
	save,
} );
console.log("there")