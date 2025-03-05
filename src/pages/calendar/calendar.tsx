import { Button } from "antd"
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import './css/calendar.css'

const CalendarPage = () => {
  const navigate = useNavigate()

  return (
    <section className="calendar__page">
        <Button><ArrowLeftOutlined /></Button>
    </section>
  )
}

export default CalendarPage