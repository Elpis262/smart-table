import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const defaultRules = ['skipEmptyTargetValues'];
    const customRules = [
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
    ];
    const compare = createComparison(defaultRules, customRules);

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchValue = state[searchField] || '';

        if (!searchValue.trim()) {
            return data;
        }

        return data.filter(row => compare(row, state));
    }
}