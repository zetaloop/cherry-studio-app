export const messages = [
  {
    key: 'hello',
    message: 'hello world',
    send: true
  },
  {
    key: 'hello2',
    message: 'hello world 2',
    send: false
  }
]

export const topics: Record<string, typeof messages> = {
  1: messages
}
