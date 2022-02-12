export const FETCH_TEST = 'FETCH_TEST';
export const FETCH_TEST_SUCCESS = 'FETCH_TEST_SUCCESS';
export const FETCH_TEST_ERROR = 'FETCH_TEST_ERROR';
export const DELETE_TEST = 'DELETE_TEST';

export const TOEIC_P1 = 1;
export const TOEIC_P2 = 2;
export const TOEIC_P3 = 3;
export const TOEIC_P4 = 4;
export const TOEIC_P5 = 5;
export const TOEIC_P6 = 6;
export const TOEIC_P7 = 7;
export const TOEIC_MINI = 8;
export const TOEIC_FULL = 9;

export const DEFAULT_VALUE_QUESTION = {
    id: 1,
    title: '',
    audio: null,
    image: null,
    answer_a: '',
    answer_b: '',
    answer_c: '',
    answer_d: '',
    explain: '',
    result: '',
    isNew: true
};

export const RESULT_QUESTIONS = [
    { label: 'Đáp án', value: '' },
    { label: 'Câu a', value: 1 },
    { label: 'Câu b', value: 2 },
    { label: 'Câu c', value: 3 },
    { label: 'Câu d', value: 4 }
];

export const GROUP_QUESTIONS = {
    id: 1,
    description: '',
    isNew: true,
    list_question: [{...DEFAULT_VALUE_QUESTION}]
}

export const TEST_INIT = {
    title: null,
    slug: null,
    category_id: null,
    grammar_id: null,
    group_questions: [JSON.parse(JSON.stringify(GROUP_QUESTIONS))]
}
