module.exports = [
  {
    type: 'input',
    name: 'name',
    message: '请输入您将生成的项目名？',
    validate: answers => {
        if(!answers.length) {
          return '项目名不能为空'
        } else if (answers.includes(' ') || answers.includes('-')) {
          return '项目名不能包含空格和连接符'
        } else {
          return true
        }
    },
    default: '',
  },
  {
    type: 'list',
    name: 'platform',
    message: '您将使用什么模板？',
    choices: [
      { name: '桌面端', value: 'pc' },
      { name: '移动端', value: 'webapp' },
    ],
    default: 'full',
  },
  {
    when: answers => answers.platform === 'pc',
    type: 'confirm',
    name: 'winuponUI',
    message: '需要引入winupon-ui吗（推荐）',
    default: true,
  },
]
