import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 模拟数据库
let students = [
  { id: 1, name: '张三', age: 20, gender: '男', major: '计算机科学', email: 'zhangsan@edu.cn', phone: '13800138001', enrollmentDate: '2023-09-01' },
  { id: 2, name: '李四', age: 21, gender: '女', major: '软件工程', email: 'lisi@edu.cn', phone: '13800138002', enrollmentDate: '2022-09-01' },
  { id: 3, name: '王五', age: 19, gender: '男', major: '数据科学', email: 'wangwu@edu.cn', phone: '13800138003', enrollmentDate: '2024-09-01' },
  { id: 4, name: '赵六', age: 22, gender: '女', major: '人工智能', email: 'zhaoliu@edu.cn', phone: '13800138004', enrollmentDate: '2021-09-01' },
  { id: 5, name: '孙七', age: 20, gender: '男', major: '网络安全', email: 'sunqi@edu.cn', phone: '13800138005', enrollmentDate: '2023-09-01' },
]
let nextId = 6

// 获取所有学生 - GET /api/students
app.get('/api/students', (req, res) => {
  res.json({
    success: true,
    data: students,
    total: students.length
  })
})

// 根据ID获取学生 - GET /api/students/:id
app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const student = students.find(s => s.id === id)
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: '学生不存在'
    })
  }
  
  res.json({
    success: true,
    data: student
  })
})

// 添加学生 - POST /api/students
app.post('/api/students', (req, res) => {
  const { name, age, gender, major, email, phone, enrollmentDate } = req.body
  
  // 验证必填字段
  if (!name || !age || !gender || !major || !email) {
    return res.status(400).json({
      success: false,
      message: '请填写所有必填字段'
    })
  }
  
  const newStudent = {
    id: nextId++,
    name,
    age: Number(age),
    gender,
    major,
    email,
    phone: phone || '',
    enrollmentDate: enrollmentDate || new Date().toISOString().split('T')[0]
  }
  
  students.push(newStudent)
  
  res.status(201).json({
    success: true,
    data: newStudent,
    message: '学生添加成功'
  })
})

// 修改学生 - PUT /api/students/:id
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = students.findIndex(s => s.id === id)
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: '学生不存在'
    })
  }
  
  const { name, age, gender, major, email, phone, enrollmentDate } = req.body
  
  // 验证必填字段
  if (!name || !age || !gender || !major || !email) {
    return res.status(400).json({
      success: false,
      message: '请填写所有必填字段'
    })
  }
  
  students[index] = {
    ...students[index],
    name,
    age: Number(age),
    gender,
    major,
    email,
    phone: phone || students[index].phone,
    enrollmentDate: enrollmentDate || students[index].enrollmentDate
  }
  
  res.json({
    success: true,
    data: students[index],
    message: '学生信息更新成功'
  })
})

// 删除学生 - DELETE /api/students/:id
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = students.findIndex(s => s.id === id)
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: '学生不存在'
    })
  }
  
  const deletedStudent = students.splice(index, 1)[0]
  
  res.json({
    success: true,
    data: deletedStudent,
    message: '学生删除成功'
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log('API Endpoints:')
  console.log('  GET    /api/students      - 获取所有学生')
  console.log('  GET    /api/students/:id  - 根据ID获取学生')
  console.log('  POST   /api/students      - 添加学生')
  console.log('  PUT    /api/students/:id  - 修改学生')
  console.log('  DELETE /api/students/:id  - 删除学生')
})
