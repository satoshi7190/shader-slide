import { writable } from 'svelte/store';

export const isErrorMessage = writable<string | null>(null);
export const isFullCanvas = writable<boolean>(false);
export const isFullScreen = writable<boolean>(false);

isFullScreen.subscribe((value) => {
	if (value) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
