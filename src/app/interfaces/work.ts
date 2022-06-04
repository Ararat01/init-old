export interface iwork {
    id: string,
    name: string,
    degree: string,
    deadline: string,
    format: string,
    requiredSkills: string[],
    niceSkills: string[],
    logo: string,
    company: {
        location: string,
        name: string,
        address: string,
        phone: string,
        email: string
    }
}