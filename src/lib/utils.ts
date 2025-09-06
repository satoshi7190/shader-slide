import { goto } from '$app/navigation';
import { page } from '$app/state';

// ページのルートを定義
const routesDev = [
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
	'/20',
	'/21',
	'/22',
	'/23',
	'/24',
	'/25',
	'/26',
	'/27',
	'/28',
	'/29',
	'/30',
	'/31',
	'/32'
];

const routesProd = [
	'/shader-slide/',
	'/shader-slide/01',
	'/shader-slide/02',
	'/shader-slide/03',
	'/shader-slide/04',
	'/shader-slide/05',
	'/shader-slide/06',
	'/shader-slide/07',
	'/shader-slide/08',
	'/shader-slide/09',
	'/shader-slide/10',
	'/shader-slide/11',
	'/shader-slide/12',
	'/shader-slide/13',
	'/shader-slide/14',
	'/shader-slide/15',
	'/shader-slide/16',
	'/shader-slide/17',
	'/shader-slide/18',
	'/shader-slide/19',
	'/shader-slide/20',
	'/shader-slide/21',
	'/shader-slide/22',
	'/shader-slide/23',
	'/shader-slide/24',
	'/shader-slide/25',
	'/shader-slide/26',
	'/shader-slide/27',
	'/shader-slide/28',
	'/shader-slide/29',
	'/shader-slide/30',
	'/shader-slide/31',
	'/shader-slide/32'
];

export const nextPage = (type: 'next' | 'prev') => {
	const currentPath = page.url.pathname;
	console.log('Current Path:', currentPath); // デバッグ用ログ
	let currentIndex;

	if (import.meta.env.PROD) {
		currentIndex = routesProd.indexOf(currentPath);

		if (type === 'next') {
			if (currentIndex < routesProd.length - 1) {
				goto(routesProd[currentIndex + 1]);
			}
		} else if (type === 'prev') {
			if (currentIndex > 0) {
				goto(routesProd[currentIndex - 1]);
			}
		}
	} else {
		currentIndex = routesDev.indexOf(currentPath);

		if (type === 'next') {
			if (currentIndex < routesDev.length - 1) {
				goto(routesDev[currentIndex + 1]);
			}
		} else if (type === 'prev') {
			if (currentIndex > 0) {
				goto(routesDev[currentIndex - 1]);
			}
		}
	}
};

// ハイライト設定の型定義
export interface HighlightLine {
	line: number; // 0ベースの行番号
	className?: string; // CSSクラス名
	type?: 'line' | 'fullLine' | 'text'; // ハイライトタイプ
	message?: string; // オプショナルなメッセージ
}

/**
 * ハイライト範囲を簡単に作成する関数
 * @param minnum 開始行番号（1ベース）
 * @param maxnum 終了行番号（1ベース、省略可）
 * @param options 追加のオプション
 * @returns HighlightRange配列
 */
export const highlightRange = (
	minnum: number,
	maxnum?: number,
	options: Partial<HighlightLine> = {}
): HighlightLine[] => {
	const startLine = Math.max(1, minnum); // 1ベースのまま

	if (maxnum === undefined) {
		// 引数が1つの場合：単一行
		return [
			{
				line: startLine,
				...options
			}
		];
	} else {
		// 引数が2つの場合 複数配列
		const endLine = Math.max(1, maxnum); // 1ベースのまま
		const range: HighlightLine[] = [];
		for (let line = startLine; line <= endLine; line++) {
			range.push({
				line,
				...options
			});
		}
		return range;
	}
};
