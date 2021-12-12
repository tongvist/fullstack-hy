const Info = ({ message, type }) => {
  const classString = `info ${type}`
  
  return (
    <div className={classString}>
      {message}
    </div>
  );
}

export default Info;