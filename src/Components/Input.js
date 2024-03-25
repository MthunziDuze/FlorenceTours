
function Input (props){
    return(
        <div>
         <label for={props.forState} class="form-label">{props.Label}</label>
          <input data-mdb-ripple-init 
           type={props.type}
           class={props.color}
           >
            {props.text}
            </input>

        </div>
    )
}

export default Input; 