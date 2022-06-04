export interface icourse {
    id: string,
    name: string,
    type: string,
    duration: string,
    deadline: string,
    format: string,
    location?: string,
    price: string,
    logo: string,
    start: string,
    companySubs: string,
    contacts: {
        phone: string,
        email: string
    },
    teacher: {
        name: string,
        img: string,
        work: string
    },
    course: string[],
    advantage: string[],
    about: string
}