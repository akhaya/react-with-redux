import React from 'react'

const Lyrics = (props) => {
  return (
    <div className="well" style={{marginTop: '20px'}}>
      <form className="form-horizontal" onSubmit={props.handleSubmit}>
        <fieldset>
          <legend>Search for lyrics</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Artist</label>
            <div className="col-xs-10">
             <input
                className="form-control"
                type="text"
                onChange={props.setArtist}
                value={props.artistQuery}/>
            </div>
            <label className="col-xs-2 control-label">Song Name</label>
            <div className="col-xs-10">
             <input
                className="form-control"
                type="text"
                onChange={props.setSong}
                value={props.songQuery}/>
            </div>
            <div className="col-xs-10 col-xs-offset-2">
              <button type='submit' className="btn btn-success">Search</button>
            </div>
          </div>
        </fieldset>
      </form>
      <pre>{props.text? props.text : null}</pre>
    </div>
  )
}

export default Lyrics;
