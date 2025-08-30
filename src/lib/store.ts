import { writable } from 'svelte/store';

export const isErrorMessage = writable<string | null>(null);
