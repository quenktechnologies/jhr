"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
const CONTROL_CHARS = /[\x00-\x1F]/;
// From Chromium // '\r', '\n' and '\0' should be treated as a terminator in
// the "relaxed" mode, see:
// https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/parsed_cookie.cc#L60
const TERMINATORS = ["\n", "\r", "\0"];
// date-time parsing constants (RFC6265 S5.1.1)
const DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;
const monthNums = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
};
/*
 * Parses a Natural number (i.e., non-negative integer) with either the
 *    <min>*<max>DIGIT ( non-digit *OCTET )
 * or
 *    <min>*<max>DIGIT
 * grammar (RFC6265 S5.1.1).
 *
 * The "trailingOK" boolean controls if the grammar accepts a
 * "( non-digit *OCTET )" trailer.
 */
function parseDigits(token, minDigits, maxDigits, trailingOK) {
    let count = 0;
    while (count < token.length) {
        let c = token.charCodeAt(count);
        // "non-digit = %x00-2F / %x3A-FF"
        if (c <= 0x2f || c >= 0x3a) {
            break;
        }
        count++;
    }
    // constrain to a minimum and maximum number of digits.
    if (count < minDigits || count > maxDigits) {
        return null;
    }
    if (!trailingOK && count != token.length) {
        return null;
    }
    return parseInt(token.substr(0, count), 10);
}
function parseTime(token) {
    let parts = token.split(":");
    let result = [0, 0, 0];
    /* RF6256 S5.1.1:
     *      time            = hms-time ( non-digit *OCTET )
     *      hms-time        = time-field ":" time-field ":" time-field
     *      time-field      = 1*2DIGIT
     */
    if (parts.length !== 3) {
        return null;
    }
    for (let i = 0; i < 3; i++) {
        // "time-field" must be strictly "1*2DIGIT", HOWEVER, "hms-time" can be
        // followed by "( non-digit *OCTET )" so therefore the last time-field 
        // can have a trailer
        let trailingOK = i == 2;
        let num = parseDigits(parts[i], 1, 2, trailingOK);
        if (num === null) {
            return null;
        }
        result[i] = num;
    }
    return result;
}
function parseMonth(token) {
    token = String(token)
        .substr(0, 3)
        .toLowerCase();
    let num = monthNums[token];
    return num >= 0 ? num : null;
}
/*
 * RFC6265 S5.1.1 date parser (see RFC for full grammar)
 */
function parseDate(str) {
    if (!str) {
        return;
    }
    /* RFC6265 S5.1.1:
     * 2. Process each date-token sequentially in the order the date-tokens
     * appear in the cookie-date
     */
    let tokens = str.split(DATE_DELIM);
    if (!tokens) {
        return;
    }
    let hour = null;
    let minute = null;
    let second = null;
    let dayOfMonth = null;
    let month = null;
    let year = null;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i].trim();
        if (!token.length) {
            continue;
        }
        let result;
        /* 2.1. If the found-time flag is not set and the token matches the time
         * production, set the found-time flag and set the hour- value,
         * minute-value, and second-value to the numbers denoted by the digits
         * in the date-token, respectively.  Skip the remaining sub-steps and
         * continue to the next date-token.
         */
        if (second === null) {
            result = parseTime(token);
            if (result) {
                hour = result[0];
                minute = result[1];
                second = result[2];
                continue;
            }
        }
        /* 2.2. If the found-day-of-month flag is not set and the date-token
         * matches the day-of-month production, set the found-day-of- month flag
         * and set the day-of-month-value to the number denoted by the
         * date-token. Skip the remaining sub-steps and continue to the next
         * date-token.
         */
        if (dayOfMonth === null) {
            // "day-of-month = 1*2DIGIT ( non-digit *OCTET )"
            result = parseDigits(token, 1, 2, true);
            if (result !== null) {
                dayOfMonth = result;
                continue;
            }
        }
        /* 2.3. If the found-month flag is not set and the date-token matches the
         * month production, set the found-month flag and set the month-value to
         * the month denoted by the date-token.  Skip the remaining sub-stepsa
         * and continue to the next date-token.
         */
        if (month === null) {
            result = parseMonth(token);
            if (result !== null) {
                month = result;
                continue;
            }
        }
        /* 2.4. If the found-year flag is not set and the date-token matches the
         * year production, set the found-year flag and set the year-value to
         * the number denoted by the date-token.  Skip the remaining sub-steps
         * and continue to the next date-token.
         */
        if (year === null) {
            // "year = 2*4DIGIT ( non-digit *OCTET )"
            result = parseDigits(token, 2, 4, true);
            if (result !== null) {
                year = result;
                /* From S5.1.1:
                 * 3.  If the year-value is greater than or equal to 70 and less
                 * than or equal to 99, increment the year-value by 1900.
                 * 4.  If the year-value is greater than or equal to 0 and less
                 * than or equal to 69, increment the year-value by 2000.
                 */
                if (year >= 70 && year <= 99) {
                    year += 1900;
                }
                else if (year >= 0 && year <= 69) {
                    year += 2000;
                }
            }
        }
    }
    /* RFC 6265 S5.1.1
     * "5. Abort these steps and fail to parse the cookie-date if:
     *     *  at least one of the found-day-of-month, found-month, found-
     *        year, or found-time flags is not set,
     *     *  the day-of-month-value is less than 1 or greater than 31,
     *     *  the year-value is less than 1601,
     *     *  the hour-value is greater than 23,
     *     *  the minute-value is greater than 59, or
     *     *  the second-value is greater than 59.
     *     (Note that leap seconds cannot be represented in this syntax.)"
     *
     * So, in order as above:
     */
    if (dayOfMonth === null ||
        month === null ||
        year === null ||
        second === null ||
        dayOfMonth < 1 ||
        dayOfMonth > 31 ||
        year < 1601 ||
        hour > 23 ||
        minute > 59 ||
        second > 59) {
        return;
    }
    return new Date(Date.UTC(year, month, dayOfMonth, hour, minute, second));
}
function trimTerminator(str) {
    if (str === '')
        return str;
    for (let t = 0; t < TERMINATORS.length; t++) {
        let terminatorIdx = str.indexOf(TERMINATORS[t]);
        if (terminatorIdx !== -1) {
            str = str.substr(0, terminatorIdx);
        }
    }
    return str;
}
function parseCookiePair(cookiePair, looseMode = false) {
    cookiePair = trimTerminator(cookiePair);
    let firstEq = cookiePair.indexOf("=");
    if (looseMode) {
        if (firstEq === 0) {
            // '=' is immediately at start
            cookiePair = cookiePair.substr(1);
            firstEq = cookiePair.indexOf("="); // might still need to split on '='
        }
    }
    else {
        // non-loose mode
        if (firstEq <= 0) {
            // no '=' or is at start
            return; // needs to have non-empty "cookie-name"
        }
    }
    let cookieName, cookieValue;
    if (firstEq <= 0) {
        cookieName = "";
        cookieValue = cookiePair.trim();
    }
    else {
        cookieName = cookiePair.substr(0, firstEq).trim();
        cookieValue = cookiePair.substr(firstEq + 1).trim();
    }
    if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
        return;
    }
    return { name: cookieName, value: cookieValue, created: new Date() };
}
/**
 * parseCookie parses a string containing a single cookie into a Cookie
 * object.
 *
 * If the string cannot be properly parsed, undefined is returned.
 */
function parseCookie(str) {
    str = String(str).trim();
    // We use a regex to parse the "name-value-pair" part of S5.2
    let firstSemi = str.indexOf(";"); // S5.2 step 1
    let cookiePair = firstSemi === -1 ? str : str.substr(0, firstSemi);
    let c = parseCookiePair(cookiePair);
    if (!c) {
        return;
    }
    if (firstSemi === -1) {
        return c;
    }
    // S5.2.3 "unparsed-attributes consist of the remainder of the set-cookie-string
    // (including the %x3B (";") in question)." plus later on in the same section
    // "discard the first ";" and trim".
    let unparsed = str.slice(firstSemi + 1).trim();
    // "If the unparsed-attributes string is empty, skip the rest of these
    // steps."
    if (unparsed.length === 0) {
        return c;
    }
    /*
     * S5.2 says that when looping over the items "[p]rocess the attribute-name
     * and attribute-value according to the requirements in the following
     * subsections" for every item.  Plus, for many of the individual attributes
     * in S5.3 it says to use the "attribute-value of the last attribute in the
     * cookie-attribute-list".  Therefore, in this implementation, we overwrite
     * the previous value.
     */
    let cookie_avs = unparsed.split(";");
    while (cookie_avs.length > 0) {
        let av = cookie_avs.shift().trim();
        if (av.length === 0) {
            // happens if ";;" appears
            continue;
        }
        let av_sep = av.indexOf("=");
        let av_key, av_value;
        if (av_sep === -1) {
            av_key = av;
            av_value = null;
        }
        else {
            av_key = av.substr(0, av_sep);
            av_value = av.substr(av_sep + 1);
        }
        av_key = av_key.trim().toLowerCase();
        if (av_value) {
            av_value = av_value.trim();
        }
        switch (av_key) {
            case "expires": // S5.2.1
                if (av_value) {
                    let exp = parseDate(av_value);
                    // "If the attribute-value failed to parse as a cookie date, 
                    // ignore the cookie-av."
                    if (exp) {
                        // over and underflow not realistically a concern: V8's
                        // getTime() seems to store something larger than a 
                        // 32-bit time_t (even with 32-bit node)
                        c.expires = exp;
                    }
                }
                break;
            case "max-age": // S5.2.2
                if (av_value) {
                    // "If the first character of the attribute-value is not a
                    // DIGIT or a "-"/ character ...[or]... If the remainder of
                    // attribute-value contains a non-DIGIT character, ignore 
                    // the cookie-av."
                    if (/^-?[0-9]+$/.test(av_value)) {
                        c.maxAge = parseInt(av_value, 10);
                    }
                }
                break;
            case "domain": // S5.2.3
                // "If the attribute-value is empty, the behavior is undefined.
                // However, the user agent SHOULD ignore the cookie-av
                // entirely."
                if (av_value) {
                    // S5.2.3 "Let cookie-domain be the attribute-value 
                    // without the leading %x2E (".") character."
                    let domain = av_value.trim().replace(/^\./, "");
                    if (domain) {
                        // "Convert the cookie-domain to lower case."
                        c.domain = domain.toLowerCase();
                    }
                }
                break;
            case "path": // S5.2.4
                /*
                 * "If the attribute-value is empty or if the first character of
                 * the attribute-value is not %x2F ("/"):
                 *   Let cookie-path be the default-path.
                 * Otherwise:
                 *   Let cookie-path be the attribute-value."
                 *
                 * We'll represent the default-path as null since it depends on
                 * the context of the parsing.
                 */
                c.path = av_value && av_value[0] === "/" ? av_value : undefined;
                break;
            case "secure": // S5.2.5
                /*
                 * "If the attribute-name case-insensitively matches the
                 * string "Secure", the user agent MUST append an attribute to
                 * the cookie-attribute-list
                 * with an attribute-name of Secure and an empty
                 * attribute-value."
                 */
                c.secure = true;
                break;
            case "httponly": // S5.2.6 -- effectively the same as 'secure'
                c.httpOnly = true;
                break;
            case "samesite": // RFC6265bis-02 S5.3.7
                let enforcement = av_value ? av_value.toLowerCase() : "";
                switch (enforcement) {
                    case "strict":
                        c.sameSite = "strict";
                        break;
                    case "lax":
                        c.sameSite = "lax";
                        break;
                    default:
                        // RFC6265bis-02 S5.3.7 step 1:
                        // "If cookie-av's attribute-value is not a
                        // case-insensitive match for "Strict" or "Lax",
                        // ignore the "cookie-av"." This effectively sets it to
                        // 'none' from the prototype.
                        break;
                }
                break;
            default:
                break;
        }
    }
    return c;
}
exports.parseCookie = parseCookie;
//# sourceMappingURL=parser.js.map