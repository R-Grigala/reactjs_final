'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '@/lib/validationSchema';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
      });

      if (!result.ok) {
        throw new Error('რეგისტრაცია ვერ მოხერხდა');
      }

      const responseData = await result.json();

      setSubmitStatus({ 
        type: 'success', 
        message: 'რეგისტრაცია წარმატებით დასრულდა!',
        data: responseData,
      });
      reset();
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.' 
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        
        {/* მარცხენა მხარე - Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeIcon}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className={styles.welcomeTitle}>გახდი ნაწილი</h2>
            <p className={styles.welcomeDesc}>შეუერთდი ჩვენს საზოგადოებას და მიიღე წვდომა ყველა ფუნქციაზე</p>
            
            <div className={styles.featuresList}>
              <div className={styles.feature}>
                <svg className={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>სწრაფი რეგისტრაცია</span>
              </div>
              <div className={styles.feature}>
                <svg className={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>უსაფრთხო პლატფორმა</span>
              </div>
              <div className={styles.feature}>
                <svg className={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>24/7 მხარდაჭერა</span>
              </div>
            </div>

            <div className={styles.loginPrompt}>
              <p>უკვე გაქვს ანგარიში?</p>
              <Link href="/login">
                <button className={styles.loginBtn}>
                  შესვლა
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* მარჯვენა მხარე - Form Section */}
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>რეგისტრაცია</h1>
            <p className={styles.formDesc}>შეავსეთ ყველა ველი ანგარიშის შესაქმნელად</p>
          </div>

          <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
            {/* სახელი და გვარი */}
            <div className={styles.gridTwoCol}>
              <div>
                <label htmlFor="firstName" className={styles.label}>
                  სახელი *
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  placeholder="თქვენი სახელი"
                />
                {errors.firstName && (
                  <p className={styles.errorText}>{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={styles.label}>
                  გვარი *
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  placeholder="თქვენი გვარი"
                />
                {errors.lastName && (
                  <p className={styles.errorText}>{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* ასაკი */}
            <div>
              <label htmlFor="age" className={styles.label}>
                ასაკი *
              </label>
              <input
                id="age"
                type="number"
                {...register('age')}
                className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
                placeholder="13-დან 120-მდე"
              />
              {errors.age && (
                <p className={styles.errorText}>{errors.age.message}</p>
              )}
            </div>

            {/* იმეილი */}
            <div>
              <label htmlFor="email" className={styles.label}>
                იმეილი *
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            {/* პაროლი */}
            <div>
              <label htmlFor="password" className={styles.label}>
                პაროლი *
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="მინ. 1 დიდი, 1 პატარა ასო და 1 რიცხვი"
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password.message}</p>
              )}
            </div>

            {/* ტელეფონი */}
            <div>
              <label htmlFor="phone" className={styles.label}>
                ტელეფონი *
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="5XXXXXXXXX"
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone.message}</p>
              )}
            </div>

            {/* Submit ღილაკი */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnLoading : ''}`}
            >
              {isSubmitting ? (
                <span className={styles.loadingSpinner}>
                  <svg className={styles.spinnerIcon} fill="none" viewBox="0 0 24 24">
                    <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  მიმდინარეობს...
                </span>
              ) : (
                'რეგისტრაცია'
              )}
            </button>
          </form>

          {/* სტატუსის შეტყობინება */}
          {submitStatus && (
            <div className={`${styles.statusMessage} ${submitStatus.type === 'success' ? styles.successStatus : styles.errorStatus}`}>
              <div className={styles.statusIcon}>
                {submitStatus.type === 'success' ? (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div>
                <p className={styles.statusTitle}>{submitStatus.message}</p>
                {submitStatus.data?.id && (
                  <p className={styles.statusDetail}>მომხმარებლის ID: {submitStatus.data.id}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}