/**
 * Dynamic Components Usage Examples
 *
 * This file demonstrates how to use the Dynamic Component system
 * similar to Contentful's component system.
 */

import React from 'react'
import { DynamicComponentRenderer } from '@/components/DynamicComponentRenderer'
import type { DynamicComponent } from '@/payload-types'

// Example 1: Basic Hero Component
export const HeroComponentExample = () => {
  const heroComponent: DynamicComponent = {
    id: 'hero-1',
    name: 'Welcome Hero',
    slug: 'welcome-hero',
    componentDefinition: {
      id: 'hero-def',
      name: 'Hero',
      slug: 'hero',
      category: 'content',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'textarea',
          required: false,
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'media',
          required: false,
        },
        {
          name: 'ctaText',
          label: 'Call to Action Text',
          type: 'text',
          required: false,
        },
        {
          name: 'ctaUrl',
          label: 'Call to Action URL',
          type: 'url',
          required: false,
        },
      ],
    },
    data: {
      title: 'Welcome to Our Website',
      subtitle: 'Discover amazing content and services',
      backgroundImage: {
        url: '/images/hero-bg.jpg',
        alt: 'Hero background',
        width: 1920,
        height: 1080,
      },
      ctaText: 'Get Started',
      ctaUrl: '/get-started',
    },
  }

  return (
    <div className="hero-example">
      <h2>Hero Component Example</h2>
      <DynamicComponentRenderer component={heroComponent} />
    </div>
  )
}

// Example 2: Card Grid Component
export const CardGridComponentExample = () => {
  const cardGridComponent: DynamicComponent = {
    id: 'card-grid-1',
    name: 'Services Grid',
    slug: 'services-grid',
    componentDefinition: {
      id: 'card-grid-def',
      name: 'Card Grid',
      slug: 'card-grid',
      category: 'layout',
      fields: [
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          required: true,
        },
        {
          name: 'cards',
          label: 'Cards',
          type: 'array',
          required: true,
          arrayFields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              type: 'media',
              required: false,
            },
            {
              name: 'link',
              type: 'url',
              required: false,
            },
          ],
        },
      ],
    },
    data: {
      title: 'Our Services',
      cards: [
        {
          title: 'Web Development',
          description: 'Custom web applications built with modern technologies',
          image: {
            url: '/images/web-dev.jpg',
            alt: 'Web Development',
            width: 400,
            height: 300,
          },
          link: '/services/web-development',
        },
        {
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile applications',
          image: {
            url: '/images/mobile-apps.jpg',
            alt: 'Mobile Apps',
            width: 400,
            height: 300,
          },
          link: '/services/mobile-apps',
        },
        {
          title: 'Consulting',
          description: 'Expert advice on technology and digital strategy',
          image: {
            url: '/images/consulting.jpg',
            alt: 'Consulting',
            width: 400,
            height: 300,
          },
          link: '/services/consulting',
        },
      ],
    },
  }

  return (
    <div className="card-grid-example">
      <h2>Card Grid Component Example</h2>
      <DynamicComponentRenderer component={cardGridComponent} />
    </div>
  )
}

// Example 3: Contact Form Component
export const ContactFormComponentExample = () => {
  const contactFormComponent: DynamicComponent = {
    id: 'contact-form-1',
    name: 'Contact Us Form',
    slug: 'contact-us-form',
    componentDefinition: {
      id: 'contact-form-def',
      name: 'Contact Form',
      slug: 'contact-form',
      category: 'form',
      fields: [
        {
          name: 'title',
          label: 'Form Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Form Description',
          type: 'textarea',
          required: false,
        },
        {
          name: 'fields',
          label: 'Form Fields',
          type: 'array',
          required: true,
          arrayFields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'text',
              required: true,
            },
            {
              name: 'required',
              type: 'checkbox',
              required: false,
            },
            {
              name: 'placeholder',
              type: 'text',
              required: false,
            },
          ],
        },
        {
          name: 'submitText',
          label: 'Submit Button Text',
          type: 'text',
          required: true,
        },
      ],
    },
    data: {
      title: 'Get in Touch',
      description: "Send us a message and we'll get back to you as soon as possible.",
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          placeholder: 'Your Name',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          placeholder: 'your@email.com',
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
          placeholder: 'Subject',
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
          placeholder: 'Your Message',
        },
      ],
      submitText: 'Send Message',
    },
  }

  return (
    <div className="contact-form-example">
      <h2>Contact Form Component Example</h2>
      <DynamicComponentRenderer component={contactFormComponent} />
    </div>
  )
}

// Example 4: How to create a new component definition programmatically
export const createComponentDefinition = () => {
  const newComponentDefinition = {
    name: 'Testimonial',
    slug: 'testimonial',
    description: 'Customer testimonial with quote and author info',
    category: 'content',
    icon: 'quote',
    fields: [
      {
        name: 'quote',
        label: 'Testimonial Quote',
        type: 'textarea',
        required: true,
        placeholder: 'Enter the testimonial quote...',
      },
      {
        name: 'author',
        label: 'Author Name',
        type: 'text',
        required: true,
      },
      {
        name: 'authorTitle',
        label: 'Author Title/Position',
        type: 'text',
        required: false,
      },
      {
        name: 'authorImage',
        label: 'Author Photo',
        type: 'media',
        required: false,
      },
      {
        name: 'company',
        label: 'Company',
        type: 'text',
        required: false,
      },
      {
        name: 'rating',
        label: 'Rating (1-5)',
        type: 'number',
        required: false,
        defaultValue: '5',
      },
    ],
    isActive: true,
  }

  return newComponentDefinition
}

// Example 5: How to use dynamic components in a page
export const PageWithDynamicComponents = () => {
  const pageComponents = [
    {
      type: 'hero',
      component: {
        // Hero component data here
      },
    },
    {
      type: 'card-grid',
      component: {
        // Card grid component data here
      },
    },
    {
      type: 'contact-form',
      component: {
        // Contact form component data here
      },
    },
  ]

  return (
    <div className="page-with-dynamic-components">
      <h1>Page with Dynamic Components</h1>
      {pageComponents.map((item, index) => (
        <div key={index} className="component-wrapper">
          {/* Render each dynamic component */}
          <DynamicComponentRenderer component={item.component} />
        </div>
      ))}
    </div>
  )
}
