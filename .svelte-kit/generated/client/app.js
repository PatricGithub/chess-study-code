export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/board_four": [4],
		"/board_one": [5],
		"/board_three": [6],
		"/board_two": [7],
		"/contact": [8],
		"/data_collection": [9],
		"/distractor_task": [10],
		"/exit_survey": [11],
		"/instruction_break": [12],
		"/instructions_one": [13],
		"/instructions_two": [14],
		"/pre_training": [15],
		"/sverdle": [~16],
		"/sverdle/how-to-play": [17],
		"/thank_you": [18],
		"/training": [19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';