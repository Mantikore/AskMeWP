import { Author } from './author';

export class Question {
    id: number;
    title: string;
    text: string;
    answers: number;
    date: string;
    author: Author;
}
