import { ItemImage } from '@/types/image';
import { Box, useTheme } from '@mui/material';
import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import ImagePreview from './ImagePreview';

const ImageUploadButton = ({
  image,
  setImage,
}: {
  image: ItemImage;
  setImage: (image: ItemImage) => void;
}) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ImagePreview image={image} />
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={(res: CloudinaryUploadWidgetResults) => {
          if (res.info) {
            const info = res.info as CloudinaryUploadWidgetInfo;
            setImage({
              publicId: info.public_id,
              url: info.url,
            });
          }
        }}
        signatureEndpoint={'/api/sign-image'}
        uploadPreset="snobbin"
        className="image_upload_button"
      >
        UPLOAD IMAGE
      </CldUploadButton>
    </Box>
  );
};

export default ImageUploadButton;
