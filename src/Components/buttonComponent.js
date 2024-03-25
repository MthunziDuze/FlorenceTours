
function Button (props){
//     Client ID
// AUcme5uBXYqCbo-4anI-jOoEnabQiYCOLuhBSZIYjknb6I4F060RGkXM8pxzfPnnYIid0pF0H1OzulbD
//sandbox url: https://sandbox.paypal.com

// Client secret
// EEXzTwiQOFg2HXI6qfh_PswCWESgKkJr2Si1FjlzfDVXRqSSYu6t2F1eBt3tchnKA3D2MAJEV7lxxTr2



    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
          <button data-mdb-ripple-init 
          type="button" 
          onClick={(e)=>{props.onClickFunc(e)}}
           class={props.color}>
                {props.text}
            </button>
            </nav>
        </div>
    )
}

export default Button; 



