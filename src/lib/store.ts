import { writable } from 'svelte/store';

export const isErrorMessage = writable<string | null>(null);
export const isFullCanvas = writable<boolean>(false);
export const isFullScreen = writable<boolean>(false);
export const fs = writable<string | null>(null);
export const run = writable<number>(0);

isFullScreen.subscribe((value) => {
	if (value) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
	}
});
