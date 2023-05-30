import {
    EPGT_CHROMOSOME_LOADED,
    EPGT_EMBRYO_SAVE_BUTTON_CLICKED,
    EPGT_EMBRYO_SAVED,
    EPGT_PLOT_LOADED,
    EPGT_SAMPLE_SAVE_BUTTON_CLICKED,
    EPGT_SAMPLE_SAVED,
    EPGT_SELECT_SAMPLE,
    EPGT_SET_OPEN_EMBRYO_DATA,
    EPGT_SET_OPEN_SAMPLE_DATA,
    EPGT_SET_PAGE,
    EPGT_SET_PAGE_TYPE, EPGT_SET_RUNS_RELOAD,
    EPGT_SET_RUN_DATA,
    EPGT_SET_RUNS,
    EPGT_SET_SEARCH_INPUT_VALUE,
    EPGT_SET_SEGMENTAL_IMAGE_LINK,
    EPGT_STOP_SAVING,
    EPGT_STOP_SAVING_SAMPLE,
    EPGT_TOGGLE_OPEN_EMBRYO,
    EPGT_UPDATE_EMBRYO_KARYOTYPE,
    EPGT_UPDATE_EMBRYO_RESULT,
    EPGT_UPDATE_SAMPLE_KARYOTYPE,
    EPGT_UPDATE_SAMPLE_RESULT, EPGT_SET_RUNS_LOADING
} from "../constants/actions";

export function setRuns(data) {
    return {type: EPGT_SET_RUNS, payload: data.data};
}

export function setSearch(value) {
    return {type: EPGT_SET_SEARCH_INPUT_VALUE, payload: value};
}

export function setPage(page) {
    return {type: EPGT_SET_PAGE, payload: page}
}

export function setReload(value) {
    return {type: EPGT_SET_RUNS_RELOAD, payload: value}
}

export function setRunsLoading(value) {
    return {type: EPGT_SET_RUNS_LOADING, payload: value}
}

export function setRunData(data) {
    return {type: EPGT_SET_RUN_DATA, payload: data};
}

export function toggleOpenEmbryo(embryo) {
    return {type: EPGT_TOGGLE_OPEN_EMBRYO, payload: embryo};
}

export function setOpenEmbryoData(data) {
    return {type: EPGT_SET_OPEN_EMBRYO_DATA, payload: data};
}

export function updateEmbryoKaryotype(karyotype) {
    return {type: EPGT_UPDATE_EMBRYO_KARYOTYPE, payload: karyotype};
}

export function selectSample(uniqueKey) {
    return {type: EPGT_SELECT_SAMPLE, payload: uniqueKey};
}

export function setOpenSampleData(openSampleData) {
    return {type: EPGT_SET_OPEN_SAMPLE_DATA, payload: openSampleData};
}

export function updateSampleKaryotype(sample, karyotype) {
    return {type: EPGT_UPDATE_SAMPLE_KARYOTYPE, payload: {sample, karyotype}};
}

export function updateSampleResult(sample, result) {
    return {type: EPGT_UPDATE_SAMPLE_RESULT, payload: {sample, result}};
}

export function updateSampleSaved(data) {
    return {type: EPGT_SAMPLE_SAVED, payload: data};
}

export function plotLoaded() {
    return {type: EPGT_PLOT_LOADED};
}

export function embryoSaveButtonClicked(karyotype, result) {
    return {type: EPGT_EMBRYO_SAVE_BUTTON_CLICKED, payload: {karyotype, result}};
}

export function sampleSaveButtonClicked(karyotype, result) {
    return {type: EPGT_SAMPLE_SAVE_BUTTON_CLICKED, payload: {karyotype, result}};
}

export function updateEmbryoSaved(data) {
    return {type: EPGT_EMBRYO_SAVED, payload: data};
}

export function chromosomeLoaded(chromosome, chromosome_url) {
    return {type: EPGT_CHROMOSOME_LOADED, payload: {chromosome, chromosome_url}};
}

export function setSegmentalImageLink(url) {
    return {type: EPGT_SET_SEGMENTAL_IMAGE_LINK, payload: url};
}

export function updateEmbryoResult(result) {
    return {type: EPGT_UPDATE_EMBRYO_RESULT, payload: result};
}

export function setPageType(page) {
    return {type: EPGT_SET_PAGE_TYPE, payload: page};
}

export function stopSaving() {
    return {type: EPGT_STOP_SAVING}
}

export function stopSavingSample(sample) {
    return {type: EPGT_STOP_SAVING_SAMPLE, payload: sample}
}