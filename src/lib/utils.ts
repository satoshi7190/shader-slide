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
