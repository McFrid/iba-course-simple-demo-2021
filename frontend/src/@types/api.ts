// export interface Pagination {
//     page: number
//     per_page: number
//     total: number
//     total_pages: number
// }

// export interface ApiResponse<T> extends Pagination {
//     data: T[]
// }

export type ApiResponse<T> = T[]

// export interface User {
//     id: number
//     email: string
//     first_name: string
//     last_name: string
//     avatar: string
// }

export interface User {
    id: number
    name: string
    username: string
    email: string
    phone?: string
    website?: string
    address?: Address
    company?: Company
}

export interface Address {
    street?: string
    suite?: string
    city: string
    zipcode?: string
}

export interface Company {
    name: string
    catchPhrase?: string
    bs?: string
}