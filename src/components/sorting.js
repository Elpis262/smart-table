import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(columns) {
        let field = null;
        let order = null;

        return (data, state, action) => {
        if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки
            if (action && action.dataset) {
            action.dataset.value = sortMap[action.dataset.value];
            field = action.dataset.field;
            order = action.dataset.value;
        }

            // @todo: #3.2 — сбросить сортировки остальных колонок
        if (action && action.dataset) {
            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });
        }
    }

            // @todo: #3.3 — получить выбранный режим сортировки
        columns.forEach(column => {
            if (column.dataset.value !== 'none') {
                field = column.dataset.field;
                order = column.dataset.value;
            }
        });

        if (field && order !== 'none') {
            return sortCollection(data, field, order);
        }

        return data;
    };
}