import { Typography } from "@mui/material";
import style from './description.module.scss';

export const Description = () => (
    <>
        <Typography variant="h1">
            Ура! Теперь можно начать работать:
        </Typography>
        <ul className={style.descriptionList}>
            <li>Выберите категорию и напишите название текущей задачи</li>
            <li>Запустите таймер («помидор»)</li>
            <li>Работайте пока «помидор» не прозвонит</li>
            <li>Сделайте короткий перерыв (3-5 минут)</li>
            <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена</li>
            <li>Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
        </ul>
    </>
)