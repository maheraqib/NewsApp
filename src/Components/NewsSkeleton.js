const NewsSkeleton = () => {
  return (
    <div className="col-md-4">
      <div className="card my-2" aria-hidden="true">
        <div className="card-img-top bg-secondary" style={{ height: "200px" }}></div>
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6 bg-secondary"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7 bg-secondary"></span>
            <span className="placeholder col-4 bg-secondary"></span>
            <span className="placeholder col-4 bg-secondary"></span>
            <span className="placeholder col-6 bg-secondary"></span>
            <span className="placeholder col-8 bg-secondary"></span>
          </p>
          <a className="btn btn-secondary disabled placeholder col-6" href="/" aria-disabled="true">
            Loading...
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsSkeleton;