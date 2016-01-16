// Matchers

beforeEach(function () {
    /**
     * Return a matcher that checks a given attribute on a DOM element.
     *
     * Attribute matchers follow a general pattern.  Generate one instead of writing the same code over and over.
     *
     * @param attribute
     * @param [description] optional description
     * @returns {Function}
     */
    var attributeMatcher = function (attribute, description) {
        if (!description) {
            description = attribute + ' attribute';
        }

        return function () {
            return {
                compare: function (actual, expected) {
                    var pass = actual.attr(attribute) === expected;

                    var toHave = pass ? 'not to have' : 'to have';
                    var dump = angular.mock.dump(actual);

                    var message = 'Expected "' + dump + '" ' + toHave + ' ' + description + ' set to "' + expected + '".';
                    return {pass: pass, message: message};
                }
            };
        };
    };

    var hasProperty = function (actual, expected) {
        if (expected === undefined) {
            return actual !== undefined
        }
        return actual === expected;
    };

    jasmine.addMatchers({
        toBeLength: function () {
            return {
                compare: function (actual, expectedLength) {
                    var pass = (actual.length === expectedLength);
                    var toHave = pass ? "not to have" : "to have";

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual) + "' " + toHave + " length of '" + expectedLength + "'"
                    };
                }
            };
        },
        toMatchArray: function () {
            return {
                compare: function (actual, expecteds) {
                    var pass = (expecteds !== undefined) &&
                        (actual !== undefined) &&
                        (expecteds.length === actual.length) &&
                        (expecteds.every(function (val, index) {
                            return val === actual[index];
                        }));

                    var toHave = pass ? "not to have" : "to have";

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual) + "' " + toHave + " entries of (" + expecteds + ")"
                    };
                }
            };
        },
        toExistOnce: function () {
            return {
                compare: function (actual) {
                    var pass = (actual.length === 1);
                    var toBe = pass ? "not to be" : "to be";

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual.selector) + "' " + toBe + " a single element."
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expected) {
                    var pass = actual.text().trim() === expected;
                    var toHave = pass ? "not to have" : "to have";

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual) + "' " + toHave + " the text '" + expected + "'"
                    };
                }
            };
        },
        toContainText: function () {
            return {
                compare: function (actual, expected) {
                    var text = "";
                    if (typeof actual === "string") {
                        text = actual;
                    } else {
                        text = actual.text();
                    }
                    var pass = text != null && (text.indexOf(expected) > -1 );
                    var toHave = pass ? "not to have" : "to have";

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual) + "' " + toHave + " the text '" + expected + "'"
                    };
                }
            };
        },
        toHaveId: attributeMatcher('id'),
        toHaveTitle: attributeMatcher('title'),
        toHaveHref: attributeMatcher('href', 'a url'),
        toHaveUiSref: attributeMatcher('ui-sref', 'a state ref'),
        toHaveValue: attributeMatcher('value'),
        toHaveSrc: attributeMatcher('src'),
        toHaveAlt: attributeMatcher('alt'),
        toHaveTranslationKey: attributeMatcher('translate', 'a translation key'),
        toHaveFallbackImage: attributeMatcher('fallback-src', 'a fallback image'),
        toHaveClass: function () {
            return {
                compare: function (actual, expected) {
                    var pass = actual.hasClass(expected);
                    var toHave = pass ? "not to have" : "to have";

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual) + "' " + toHave + " a class '" + expected + "'."
                    };
                }
            };
        },
        toBeHidden: function () {
            return {
                compare: function (actual) {
                    var expected = 'ng-hide';
                    var pass = actual.hasClass(expected);
                    var toHave = pass ? "not to have" : "to have";

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual) + "' " + toHave + " a class '" + expected + "'."
                    };
                }
            };
        },
        toBeChecked: function () {
            return {
                compare: function (actual) {
                    var pass = !!actual.attr('checked');
                    var toBe = pass ? 'not to be' : 'to be';

                    return {
                        pass: pass,
                        message: 'Expected "' + angular.mock.dump(actual) + '" ' + toBe + ' checked.'
                    };
                }
            };
        },
        toBeSelected: function () {
            return {
                compare: function (actual) {
                    var pass = !!actual.attr('selected');
                    var toBe = pass ? 'not to be' : 'to be';

                    return {
                        pass: pass,
                        message: 'Expected "' + angular.mock.dump(actual) + '" ' + toBe + ' selected.'
                    };
                }
            };
        },
        toEndWith: function () {
            return {
                compare: function (actual, expected) {
                    var pass = (typeof actual === 'string') && (actual.indexOf(expected, actual.length - expected.length) !== -1);
                    var toBe = pass ? 'not to' : 'to';

                    return {
                        pass: pass,
                        message: "Expected '" + angular.mock.dump(actual) + "' " + toBe + " end with '" + expected + "'."
                    };
                }
            };
        },
        toHaveAttr: function () {
            return {
                compare: function (actual, attributeName, expectedAttributeValue) {
                    return {
                        pass: hasProperty($(actual).attr(attributeName), expectedAttributeValue)
                    }
                }
            }
        }
    });
});
