import EditorialCollage from "../../../../shared/components/media/EditorialCollage";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

const IdentityRequestPreview = () => (
  <figure className="identity-editorial">
    <EditorialCollage
      image={editorialPhotos.personalLaptop}
      detailImage={editorialPhotos.personalPhone}
      priority
    />
    <figcaption className="identity-editorial-caption">
      <div>
        <p className="editorial-kicker">Consent-first identity</p>
        <h2>You choose what to share.</h2>
      </div>
      <p>Review each request, understand its purpose, and approve only the claims you choose.</p>
    </figcaption>
  </figure>
);

export default IdentityRequestPreview;
