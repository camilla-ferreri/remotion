import type {MediaParserController} from '../../controller/media-parser-controller';
import type {PrefetchCache} from '../../fetch';
import type {LogLevel} from '../../log';
import type {ParseMediaSrc} from '../../options';
import type {ReaderInterface} from '../../readers/reader';
import {cachedSamplePositionsState} from './cached-sample-positions';
import {lazyMfraLoad} from './lazy-mfra-load';
import {moovState} from './moov-box';
import {precomputedMoofState} from './precomputed-moof';
import {precomputedTfraState} from './precomputed-tfra';

export const isoBaseMediaState = ({
	contentLength,
	controller,
	readerInterface,
	src,
	logLevel,
	prefetchCache,
}: {
	contentLength: number;
	controller: MediaParserController;
	readerInterface: ReaderInterface;
	src: ParseMediaSrc;
	logLevel: LogLevel;
	prefetchCache: PrefetchCache;
}) => {
	return {
		flatSamples: cachedSamplePositionsState(),
		moov: moovState(),
		mfra: lazyMfraLoad({
			contentLength,
			controller,
			readerInterface,
			src,
			logLevel,
			prefetchCache,
		}),
		moof: precomputedMoofState(),
		tfra: precomputedTfraState(),
	};
};

export type IsoBaseMediaState = ReturnType<typeof isoBaseMediaState>;
