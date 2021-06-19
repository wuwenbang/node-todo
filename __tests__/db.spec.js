import db from '../db'
import fs from '../__mocks__/fs'
jest.mock('fs')
describe('db', () => {
  it('can read', async () => {
    const data = [{ title: 'hi', done: 'true' }]
    fs.setMock('/xxx', null, JSON.stringify(data))
    console.lpg(fs.readFile('/xxx'))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(data)
  })
})
