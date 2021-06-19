import db from './db.js'
import inquirer from 'inquirer'

const askForCreateTask = (list) => {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: 'Please input new task title',
      // default: list[index].title,
    })
    .then((answers) => {
      list.push({
        title: answers.title,
        done: false,
      })
      db.write(list)
    })
}
const markAsDone = (list, index) => {
  list[index].done = true
  db.write(list)
}
const markAsUndone = (list, index) => {
  list[index].done = false
  db.write(list)
}
const updateTitle = (list, index) => {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: 'Please input new title',
      default: list[index].title,
    })
    .then((answers) => {
      list[index].title = answers.title
      db.write(list)
    })
}
const removeTask = (list, index) => {
  list.splice(index, 1)
  db.write(list)
}
const askForAction = (list, index) => {
  const actions = { markAsDone, markAsUndone, updateTitle, removeTask }
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Please select the operator',
        choices: [
          { name: '⬅️  exit', value: 'quit' },
          { name: '✅ done', value: 'markAsDone' },
          { name: '⏹  undone', value: 'markAsUndone' },
          { name: '🔄 change title', value: 'updateTitle' },
          { name: '❌ remove', value: 'removeTask' },
        ],
      },
    ])
    .then((answers) => {
      const action = actions[answers.action]
      action && action(list, index)
    })
}
const printTasks = (list) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: 'Please select the task you want to operate:',
        choices: [
          { name: `⬅️  exit`, value: '-1' },
          ...list.map((task, index) => {
            return { name: `${task.done ? '✅' : '⏹ '} ${index + 1} ${task.title}`, value: index }
          }),
          { name: '🆕 create a task', value: '-2' },
        ],
      },
    ])
    .then((answers) => {
      const index = parseInt(answers.index)
      if (index >= 0) {
        // 选中一个任务
        askForAction(list, index)
      } else if (index === -2) {
        // 创建一个任务
        askForCreateTask(list)
      }
    })
}

// 显示任务
const show = async () => {
  const list = await db.read()
  printTasks(list)
}

// 添加任务
const add = async (title) => {
  // 读取
  const list = await db.read()
  // 添加
  list.push({ title, done: false })
  // 存储
  await db.write(list)
}

// 清空任务
const clear = async () => {
  db.clear()
}

export default { add, clear, show }
