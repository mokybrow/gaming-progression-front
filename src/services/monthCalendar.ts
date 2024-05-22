import {
    ONE, SEVEN, SIX, THIRTHY_ONE, ZERO,
} from './constants';

export type CalendarResp = {
    month: Array<Array<number>>,

    year: number,
}

export type Calendar = (_year: number, _month: number) => CalendarResp;
export type CalendarBoard = (_year: number, _month: number) => number[][];
export type UpperCase = (_word: string) => string
export type LastDay = (_year: number, _month: number) => number;
export type Board = () => number[][];


const generateBoard: Board = () => {
    const board = Array(SIX).fill(Array(SEVEN).fill(ZERO));
    return board;
};

const getLastDay: LastDay = (year, month) => {
    let day = THIRTHY_ONE;
    let date = new Date(year, month, day);

    while (date.getMonth() !== month) {
        day -= 1;
        date = new Date(year, month, day);
    }

    return day;
};

const generateCalendarBoard: CalendarBoard = (year, month) => {
    const lastDay = getLastDay(year, month);
    const board = generateBoard();
    const dayInit = new Date(year, month, ONE).getDay();

    let day = ZERO;

    const calendarBoard = board.map((week, weekCount) => week.map((empty, index) => {
        const position = weekCount * SEVEN + index + 1 ;
        if (position < dayInit || day >= lastDay) return empty;
        day += ONE;
        return day;
    })).filter((week) => !week.every((day) => !day));

    return calendarBoard;
};

// const toFirstUpperCase: UpperCase = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;


const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'];

const monthCalendar: Calendar = (year, month) => {
    const board = generateCalendarBoard(year, month);
    // const monthName = toFirstUpperCase(monthNames[month]);

    return { month: board, year };
};

export default monthCalendar;


