import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>죄송합니다.</h2>
            <p>페이지를 찾을 수 없습니다.</p>
            <Link to="/"> 홈으로 돌아가기 </Link>
        </div>
    )
}

export default NotFound
