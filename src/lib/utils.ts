import { goto } from '$app/navigation';
import { page } from '$app/state';

// ページのルートを定義
const routes = [
	'/',
	'/01',
	'/02',
	'/03',
	'/04',
	'/05',
	'/06',
	'/07',
	'/08',
	'/09',
	'/10',
	'/11',
	'/12',
	'/13',
	'/14',
	'/15',
	'/16',
	'/17',
	'/18',
	'/19',
	'/20'
];

export const nextPage = (type: 'next' | 'prev') => {
	const currentPath = page.url.pathname;
	const currentIndex = routes.indexOf(currentPath);

	if (type === 'next') {
		if (currentIndex < routes.length - 1) {
			goto(routes[currentIndex + 1]);
		}
	} else if (type === 'prev') {
		if (currentIndex > 0) {
			goto(routes[currentIndex - 1]);
		}
	}
};

// export const toggleFullScreen = (value: boolean) => {
// 	if (value) {
// 		document.documentElement.requestFullscreen();
// 	} else {
// 		document.exitFullscreen();
// 	}
// };
