#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'
import api from './api.js'
const program = new Command()

program
  .command('add <args...> ')
  .description('add a task')
  .action((args) => {
    const words = args.join(' ')
    api.add(words)
  })

program
  .command('clear')
  .description('clear all tasks')
  .action((...args) => {
    api.clear()
  })

program
  .command('ls')
  .description('show all tasks')
  .action((...args) => {
    api.show()
  })
program.parse(process.argv)
