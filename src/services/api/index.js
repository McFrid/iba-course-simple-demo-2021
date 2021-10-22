import { create } from "apisauce";

const api = create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getUsers = async (params) => {
    const { ok, problem, data } = await api.get('/users', params)

    if (ok) {
        return data
    }

    throw new Error(problem)
}

export const removeUser = async (id) => {
    const { ok, problem } = await api.delete(`/users/${id}`)

    if (!ok) {
        throw new Error(problem)
    }
}

export const createUser = async (user) => {
    const { ok, problem, data } = await api.post('/users', user)

    if (ok) {
        return data
    }

    throw new Error(problem)
}