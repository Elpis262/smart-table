import {createComparison, defaultRules} from "../lib/compare.js";


export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        Object.values(indexes[elementName]).forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            elements[elementName].append(option);
        });
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const parent = action.closest('.field');
            if (parent) {
                const input = parent.querySelector('input, select');
                if (input) {
                    input.value = '';
                    state[field] = '';
                }
            }
        }

        // @todo: #4.3 — настроить компаратор
const customRules = [
    (key, sourceValue, targetValue) => {
        if (key === 'totalFrom' && targetValue !== '' && targetValue !== undefined) {
            const sourceNum = parseFloat(sourceValue);
            const targetNum = parseFloat(targetValue);
            if (!isNaN(sourceNum) && !isNaN(targetNum)) {
                return { result: sourceNum >= targetNum };
            }
        }
        return { continue: true };
    },
    (key, sourceValue, targetValue) => {
        if (key === 'totalTo' && targetValue !== '' && targetValue !== undefined) {
            const sourceNum = parseFloat(sourceValue);
            const targetNum = parseFloat(targetValue);
            if (!isNaN(sourceNum) && !isNaN(targetNum)) {
                return { result: sourceNum <= targetNum };
            }
        }
        return { continue: true };
    }
];

        const compare = createComparison(defaultRules, customRules);

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}