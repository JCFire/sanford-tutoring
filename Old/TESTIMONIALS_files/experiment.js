define(['lodash'], function (_) {
    'use strict';

    if (typeof window !== 'object') {
        return {
            isOpen: _.constant(false)
        };
    }

    var rawRunningExperiments = getRunningExperiments();
    var transformedRunningExperiments = transformRunningExperiments(rawRunningExperiments);

    function isOpen(name) {
        return getValue(name) === 'new';
    }

    function getValue(name) {
        if (rawRunningExperiments !== getRunningExperiments()) {
            rawRunningExperiments = getRunningExperiments();
            transformedRunningExperiments = transformRunningExperiments(getRunningExperiments());
        }
        return transformedRunningExperiments[name.toLowerCase()];
    }

    function isMultiValueExperimentOpen(name) {
        var value = getValue(name);
        return value && value !== 'old';
    }

    function getRunningExperiments() {
        return (window.rendererModel || window.editorModel || {}).runningExperiments;
    }

    function transformRunningExperiments(runningExperiments) {
        return _.mapKeys(runningExperiments, function (value, key) {
            return key.toLowerCase();
        });
    }

    return {
        isOpen: isOpen,
        getValue: getValue,
        isMultiValueExperimentOpen: isMultiValueExperimentOpen
    };
});
