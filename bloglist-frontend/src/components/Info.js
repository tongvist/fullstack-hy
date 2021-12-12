import PropTypes from 'prop-types';

const Info = ({ message, type }) => {
  const classString = `info ${type}`
  
  return (
    <div className={classString}>
      {message}
    </div>
  );
}

Info.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Info;