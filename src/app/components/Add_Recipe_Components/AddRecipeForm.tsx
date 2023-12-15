'use client'

import { canvasPreview } from '@/lib/canvas'
import { useDebounceEffect } from '@/lib/hooks/useDebounceEffect'
import { TAddRecipeSchema, TResponse, addRecipeSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactCrop, { type PixelCrop, type Crop } from 'react-image-crop'
import { toast } from 'react-toastify'
import IngredientsPicker from './IngredientsPicker'
import { cn, getErrorMessage } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import  useClickOutside  from '@/lib/hooks/useClickOutside'
const AddRecipeForm = () => {
   const router = useRouter()
   const fileRef = useRef<HTMLInputElement | null>(null)
   const previewCanvasRef = useRef<HTMLCanvasElement>(null)
   const imageRef = useRef<HTMLImageElement>(null)
   const blobUrlRef = useRef('')
   const [imageSrc, setImageSrc] = useState(null)
   const [crop, setCrop] = useState<Crop>(undefined)
   const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
   const [aspect, setAspect] = useState(1)
   const [croppedImage, setCroppedImage] = useState(null)
   const [blob, setBlob] = useState<Blob | null>(null)
   const [showIngredients, setShowIngredients] = useState(false)
   const modalRef = useRef<HTMLElement | null>(null)

   

   const handleFileChange = () => {
      if (fileRef.current?.files?.length < 1) return
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () => {
         setImageSrc(reader.result?.toString() ?? '')
      })
      reader.readAsDataURL(fileRef.current?.files[0])
   }

   function onCancelModal ()  {
      setImageSrc(undefined)
      setCompletedCrop(undefined)
      fileRef.current.value = null
   }

   const onAcceptModal = () => {
      setImageSrc(undefined)
      getCroppedImage()
   }

   //   function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
   //     if (aspect) {
   //       const { width, height } = e.currentTarget;
   //       setCrop(centerAspectCrop(width, height, aspect));
   //     }
   //   }

   async function getCroppedImage() {
      const image = imageRef.current
      const previewCanvas = previewCanvasRef.current
      if (!image || !previewCanvas || !completedCrop) {
         throw new Error('Crop canvas does not exist')
      }
      // This will size relative to the uploaded image
      // size. If you want to size according to what they
      // are looking at on screen, remove scaleX + scaleY
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      const offscreen = new OffscreenCanvas(
         completedCrop.width * scaleX,
         completedCrop.height * scaleY
      )
      const ctx = offscreen.getContext('2d')
      if (!ctx) {
         throw new Error('No 2d context')
      }

      ctx.drawImage(
         previewCanvas,
         0,
         0,
         previewCanvas.width,
         previewCanvas.height,
         0,
         0,
         offscreen.width,
         offscreen.height
      )
      // You might want { type: "image/jpeg", quality: <0 to 1> } to
      // reduce image size
      const blob = await offscreen.convertToBlob({
         type: 'image/png',
      })
      setBlob(blob)
      if (blobUrlRef.current) {
         URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      setCroppedImage(blobUrlRef.current)
   }

   useDebounceEffect(
      async () => {
         if (
            completedCrop?.width &&
            completedCrop?.height &&
            imageRef.current &&
            previewCanvasRef.current
         ) {
            const scale = 1
            const rotate = 0
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
               imageRef.current,
               previewCanvasRef.current,
               completedCrop,
               scale,
               rotate
            )
            return
         }
         const ctx = previewCanvasRef.current.getContext('2d')
         ctx.clearRect(
            0,
            0,
            previewCanvasRef.current.width,
            previewCanvasRef.current.height
         )
      },
      100,
      [completedCrop]
   )

   const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      reset,
   } = useForm<TAddRecipeSchema>({ resolver: zodResolver(addRecipeSchema) })

   const onSubmit = async (data: TAddRecipeSchema, e: React.FormEvent) => {
      const body = new FormData(e.target as HTMLFormElement)

      if (blob) {
         const imageFile = new File([blob], 'dish.png', { type: 'image/png' })
         body.append('file', imageFile)
      }
      try {
         const response = await fetch('/api/add-recipe', {
            method: 'POST',
            body,
            cache: 'no-store',
         })
         const res = (await response.json()) as TResponse
         if (res.success) {
            toast.success('Successfully added a new recipe to your cookbook.')
            reset()
            router.refresh()
            setImageSrc(undefined)
            setCompletedCrop(undefined)
            fileRef.current.value = null
         } else if ('errors' in res) {
            res.errors.forEach((err) => {
               toast.error(err)
            })
         } else {
            throw new Error(res.message)
         }
      } catch (err) {
         const errMessage = getErrorMessage(err)
         toast.error(errMessage)
      }
   }

   useEffect(() => {
      if (Object.keys(errors).length > 0) {
         for (let key in errors) {
            //@ts-ignore
            toast.error(errors[key].message, { toastId: `${key}-error` })
         }
      }
   }, [errors])

   return (
      <div className=''>
         <h1 className='text-center text-xl font-mono font-bold mb-8'>
            Add a page to your cookbook
         </h1>
         <div className='custom-underline'></div>
         <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr]'>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='p-4 grid gap-8 grid-cols-[repeat(auto-fit,_minmax(min(225px,_100%),_1fr))]'
            >
               <div className='form-control input-header'>
                  <div className='tooltip text-left' data-tip='Required'>
                     <label htmlFor='title' className='left-0'>
                        Give your recipe a title<sup>*</sup>
                     </label>
                  </div>
                  <input
                     placeholder={'Yummy title...'}
                     className='text-zinc-200 py-1 px-4 font-sans rounded-md'
                     type='text'
                     id='title'
                     {...register('title')}
                  />
               </div>
               <div className='form-control input-header'>
                  <label htmlFor='sources'>Provide a source</label>
                  <input
                     placeholder={'Yummy source...'}
                     className='text-zinc-200 py-1 px-4 font-sans rounded-md'
                     type='text'
                     id='sources'
                     {...register('sources')}
                  />
               </div>
               {/* BASIC TAGS */}
               <fieldset className='flex flex-wrap gap-6 items-center'>
                  <div className='radio-control '>
                     <input
                        className='checked-checkbox'
                        hidden
                        defaultChecked
                        value='meat'
                        type='radio'
                        {...register('type')}
                        id='radio-btn-type-meat'
                     />
                     <label
                        tabIndex={0}
                        className='focus-visible:border-2 hover:border-2 hover:border-black focus-visible:border-black px-4 py-3 rounded-md bg-zinc-200 font-semibold text-sm'
                        htmlFor='radio-btn-type-meat'
                     >
                        Meat
                     </label>
                  </div>
                  <div className='radio-control'>
                     <input
                        className='checked-checkbox'
                        hidden
                        value='vegetarian'
                        type='radio'
                        {...register('type')}
                        id='radio-btn-type-vegetarian'
                     />
                     <label
                        tabIndex={0}
                        className='focus-visible:border-2 hover:border-2 hover:border-black focus-visible:border-black px-4 py-3 rounded-md bg-zinc-200 font-semibold text-sm'
                        htmlFor='radio-btn-type-vegetarian'
                     >
                        Vegetarian
                     </label>
                  </div>
                  <div className='radio-control'>
                     <input
                        className='checked-checkbox'
                        hidden
                        value='vegan'
                        type='radio'
                        {...register('type')}
                        id='radio-btn-type-vegan'
                     />
                     <label
                        tabIndex={0}
                        className='focus-visible:border-2 hover:border-2 hover:border-black focus-visible:border-black px-4 py-3 rounded-md bg-zinc-200 font-semibold text-sm'
                        htmlFor='radio-btn-type-vegan'
                     >
                        Vegan
                     </label>
                  </div>
               </fieldset>
               <div className='relative checked-ingredients flex items-center'>
                  <div
                     role='button'
                     tabIndex={0}
                     onClick={() => setShowIngredients(!showIngredients)}
                     className='btn w-full ingredients'
                  >
                     Pick tags for ingredients
                  </div>
                  <IngredientsPicker
                     register={register}
                     className={cn(
                        { 'visually-hidden': !showIngredients },
                        'absolute w-full left-0 top-[4rem]'
                     )}
                  />
               </div>
               <button
                  disabled={isSubmitting}
                  className='btn col-[1/-1] bg-primary'
                  type='submit'
               >
                  {isSubmitting ? (
                     <div className='loading loading-ring'></div>
                  ) : (
                     'Submit'
                  )}
               </button>
            </form>
            <div className='flex flex-col items-start mx-auto'>
               <h2 className='input-header'>Upload an appetizing picture</h2>
               <form className='flex flex-col gap-8 border-2'>
                  <label htmlFor='file' className='cursor-pointer'>
                     <>
                        <div className=''>
                           <canvas
                              ref={previewCanvasRef}
                              style={{
                                 border: '1px dashed black',
                                 objectFit: 'cover',
                                 width: 200,
                                 height: 200,
                              }}
                           />
                        </div>
                     </>
                  </label>
                  <input
                     ref={fileRef}
                     onChange={handleFileChange}
                     className='hidden'
                     accept='image/*;capture=camera'
                     type='file'
                     name='file'
                     id='file'
                     onClick={() => (fileRef.current.value = null)}
                  />
               </form>
               {!!imageSrc && (
                  <aside  ref={modalRef}
                     className='flex flex-col gap-4 bg-white p-4 shadow 
                     
                  after:fixed after:top-0 after:left-0 after:z-[-1] after:w-[200vw] after:h-[200vh] after:translate-x-[-50%] after:translate-y-[-50%] after:backdrop-blur-sm
            
            
                  justify-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
                  >
                     <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                     >
                        <Image
                           src={imageSrc}
                           alt={'Crop me'}
                           ref={imageRef}
                           // onLoad={onImageLoad}
                           width={300}
                           height={300}
                           className='w-[max(20rem,40vmin)]'
                        />
                     </ReactCrop>
                     <div className='join mx-auto'>
                        <button
                           disabled={!completedCrop}
                           onClick={onAcceptModal}
                           className='join-item btn btn-accent'
                        >
                           Accept
                        </button>
                        <button
                           onClick={onCancelModal}
                           className='join-item btn btn-outline'
                        >
                           Cancel
                        </button>
                     </div>
                  </aside>
               )}
            </div>
         </div>
      </div>
   )
}

export default AddRecipeForm
