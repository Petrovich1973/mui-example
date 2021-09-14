import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    list: {
        fontSize: "larger"
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h6" component="h3" gutterBottom>
                Элементы пользовательского сценария:
            </Typography>
            <ul className={classes.list}>
                <li>Список пользователей (в каких случаях необходимо выбирать из списка?)</li>
                <li>Список отчетностей (сколько примерно отчетностей? поиск необходим? как группировать отчетности?)
                </li>
                <li>Конфигурация запроса (визард. пошаговая настройка запроса)</li>
                <li>Список сохраненных конфигураций запросов в разрезе отчетностей (фича)</li>
                <li>Список существующих запросов (завершенных, незавершенных, с ошибкой)</li>
                <li>Детализация резултата запроса и его настройки (например доступ, расписание)</li>
            </ul>
        </div>
    )
}
