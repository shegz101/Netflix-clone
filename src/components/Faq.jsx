import {FaQuestionCircle} from 'react-icons/fa';
import Question from './Question';
import { questions } from './Data';

const Faq = () => {
    return ( 
        <section>
            <div className="container">
                <div className="faq-title">
                    <FaQuestionCircle style={{color:'#e50914', marginLeft:'15px'}} size={30}/>
                    <h1 style={{color:'#fff', paddingTop:'25px'}}>FAQS</h1>
                </div>
            </div>
            <div className="questions">
                {
                    questions.map((question) => (
                        <Question key={question.id} title={question.title} answer={question.answer}/>
                    ))
                }
            </div>
        </section>
     );
}
 
export default Faq;