/*globals $*/
(function () {
    /**
     * @type {Array<{
     *   title: string,
     *   total: number,
     *   bands: Array<{begin: number, end: number}>
     * }}
     */
    $.get('/topics', function (topics) {
        /** @type {string} */
        var topicTpl = $('#tpl-topic').html();

        /** @type {string} */
        var bandTpl = $('#tpl-progress-band').html();

        topics.forEach(function (topic) {
            $('#topic-container').append(makeTopicHtml(topic, topicTpl, bandTpl));
        });
    });

    function makeTopicHtml(topic, topicTpl, bandTpl) {
        var bandHtml = (topic.bands || []).map(function (band) {
                return makeBandHtml(band, topic.total, bandTpl);
            }).join('');
        var progress_pct = formatProgress(calcBandSum(topic.bands) / topic.total);

        return topicTpl.replace('{{title}}', topic.title || '')
                       .replace('{{bands}}', bandHtml)
                       .replace('{{progress_num}}', progress_pct + '%');
    }

    function calcBandSum(bands) {
        return (bands || []).reduce(function (sum, band) {
            return sum + (band.end - band.begin + 1);
        }, 0);
    }

    function makeBandHtml(band, total, bandTpl) {
        var left = band.begin / total * 100;
        var width = (band.end - band.begin + 1) / total * 100;
        return bandTpl.replace('{{style}}', [
                'left:', left.toFixed(2), '%;',
                'width:', width.toFixed(2), '%;'].join(''));
    }

    function formatProgress(num) {
        return num > 1 ? '100' : num.toFixed(2);
    }

})();
