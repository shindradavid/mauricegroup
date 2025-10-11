import { useContext, useState, type FormEvent, type FormEventHandler } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import z from 'zod';

import styles from './styles.module.scss';
import { useCreateCustomCakeOrderMutation, useGetCakeOrderHandlers } from '~/api/cakeOrdersApi';
import AuthContext from '~/context/AuthContext';
import { useModals } from '~/context/ModalContext';

export const CakeDetailsPage = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { openGoogleModal } = useModals();

  const [price, setPrice] = useState('');
  const [cakeWritings, setCakeWritings] = useState('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>(new Date().toISOString().split('T')[1]);
  const [cakePhotos, setCakePhotos] = useState<File[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setCakePhotos((prev) => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setCakePhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const domain = typeof window !== 'undefined' ? window.location.host : '';

  const { data } = useGetCakeOrderHandlers(domain);

  const [selectedStaffMemberId, setSelectedStaffMemberId] = useState<string | null>(null);

  const getLastName = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    return parts[parts.length - 1];
  };

  const createOrderMutation = useCreateCustomCakeOrderMutation({
    onSuccess: (message) => {
      setCakeWritings('');
      setReceiverPhoneNumber('');
      setReceiverName('');
      setDeliveryLocation('');
      setDeliveryDate('');
      setDeliveryTime('');
      toast.success(message ?? 'Order placed successfully!');
      navigate('/my-orders');
    },
    onError: (message) => toast.error(message ?? 'Failed to place order'),
  });

  const handleSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();

    const cakeOrderSchema = z.object({
      price: z.string(),
      marketeerId: z.string().uuid('Staff member must be selected'),
      cakeWritings: z.string().min(1, 'Cake writings are required'),
      cakeColor: z.string().min(1, 'Cake color are required'),
      receiverName: z.string().min(1, 'Receiver name are required'),
      receiverPhoneNumber: z
        .string()
        .min(9, 'Phone number is too short')
        .regex(/^\d{9,12}$/, 'Invalid phone number format'),
      description: z.string().min(5, 'Description is too short'),
      deliveryLocation: z.string().min(1, 'Delivery location is required'),
      deliveryDateTime: z.string().datetime(),
      photos: z.array(z.instanceof(File)),
    });

    if (!selectedStaffMemberId) {
      toast.error('Select a handler.');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to place an order');
      openGoogleModal();
      return;
    }

    const deliveryDateTime = new Date(`${deliveryDate}T${deliveryTime}`).toISOString();

    const payload = {
      marketeerId: selectedStaffMemberId!,
      cakeWritings,
      cakeColor: 'Check description',
      receiverName,
      receiverPhoneNumber,
      description,
      deliveryLocation,
      deliveryDateTime,
      photos: cakePhotos,
      price,
    };

    const result = cakeOrderSchema.safeParse(payload);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? 'Invalid input';
      toast.error(firstError);
      return;
    }

    createOrderMutation.mutate(result.data);
  };

  return (
    <div>
      <>
        <div className={styles.cakeFormContainer}>
          <form action="" className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cakeWritings" className="field__label">
                Cake price
              </label>

              <input
                type="number"
                name="cakeWritings"
                id="cakeWritings"
                placeholder="eg. 10000"
                className="field__input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="cakeWritings" className="field__label">
                Cake writings
              </label>
              <p className="field__help-text">Enter the words that you want to be written on this cake.</p>

              <input
                type="text"
                name="cakeWritings"
                id="cakeWritings"
                placeholder="eg. Happy birthday my everything"
                className="field__input"
                value={cakeWritings}
                onChange={(e) => setCakeWritings(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="receiverName" className="field__label">
                Receiver's name
              </label>

              <input
                type="text"
                name="receiverName"
                id="receiverName"
                value={receiverName}
                className="field__input"
                onChange={(e) => setReceiverName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="receiverPhoneNumber" className="field__label">
                Receiver's phone number
              </label>
              <p className="field__help-text">Enter the phone number of the person that will receive this cake.</p>

              <input
                type="text"
                name="receiverPhoneNumber"
                id="receiverPhoneNumber"
                placeholder="eg. 0743484155"
                className="field__input"
                value={receiverPhoneNumber}
                onChange={(e) => setReceiverPhoneNumber(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="description" className="field__label">
                Description
              </label>
              <p className="field__help-text">Enter the cake description.</p>

              <textarea
                name="description"
                id="description"
                value={description}
                className="field__input"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="field">
              <label htmlFor="deliveryLocation" className="field__label">
                Delivery location
              </label>

              <input
                type="text"
                name="deliveryLocation"
                id="deliveryLocation"
                value={deliveryLocation}
                className="field__input"
                onChange={(e) => setDeliveryLocation(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="deliveryDate" className="field__label">
                Delivery date
              </label>

              <input
                type="date"
                name="deliveryDate"
                id="deliveryDate"
                value={deliveryDate}
                className="field__input"
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="deliveryTime" className="field__label">
                Delivery time
              </label>

              <input
                type="time"
                name="deliveryTime"
                id="deliveryDate"
                value={deliveryTime}
                className="field__input"
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field__label">Who should handle your order?</label>

              <ul className={styles.staffList}>
                {data?.staff.map((s) => {
                  const isSelected = selectedStaffMemberId === s.id;
                  return (
                    <li
                      key={s.id}
                      onClick={() => setSelectedStaffMemberId(s.id)}
                      className={`${styles.staffItem} ${isSelected ? styles.selected : ''}`}
                    >
                      <img src={s.photoUrl} alt={s.name} className={styles.avatar} loading="lazy" />
                      <div className={styles.info}>
                        <strong>{getLastName(s.name)}</strong>
                        <p>{s.phoneNumber}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="field">
              <label className="field__label">Cake photos</label>
              <p className="field__help-text">Upload photos of the cake design you want (optional).</p>

              {/* Hidden file input */}
              <input
                type="file"
                id="cakePhotos"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />

              {/* Styled button to trigger the file input */}
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => document.getElementById('cakePhotos')?.click()}
              >
                + Add Photo
              </button>

              {/* Preview section */}
              <div className={styles.previewGrid}>
                {cakePhotos.map((photo, index) => (
                  <div key={index} className={styles.previewItem}>
                    <img src={URL.createObjectURL(photo)} alt={`preview-${index}`} className={styles.previewImage} />
                    <button type="button" className={styles.removeButton} onClick={() => removePhoto(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="button primary block" disabled={createOrderMutation.isPending}>
              {createOrderMutation.isPending ? 'Placing order...' : 'Place order'}
            </button>
          </form>
        </div>
      </>
    </div>
  );
};

export default CakeDetailsPage;
