import {Suspense, unstable_ViewTransition as ViewTransition} from 'react';
import NotFound from "@/app/not-found";
import LoadingSpinner from "@/components/LoadingSpinner";
import parse from "html-react-parser";
import {getPageData, PageData, PageSection} from "@/utils/api";
import FormContact from "@/components/FormContact";
import {generatePageSEO} from "@/utils/seoConfig";
import Slider from "@/components/global/Slider";
import Banner from "@/components/client/Banner";
import NestedGallery from "@/components/client/NestedGallery";

// Fetching with console log to verify URL

// Map template names to components
const sectionComponentMap: Record<string, React.ComponentType<any>> = {
  hero_banner: Banner,
  overview: Slider,
  gallery: NestedGallery,
  form: FormContact,
  // Add more mappings as needed
};

export async function generateMetadata() {
    // Fetch the page data
    const pageData = await getPageData();

    // Handle the case where page data is missing
    if (!pageData || !pageData?.page_data) {
        console.error('Error: Metadata could not be generated due to missing page data.');

        // Use the SEO config with default values
        return generatePageSEO({
            title: 'Next.js Boilerplate',
            description: 'Learn more about our team and mission.',
        });
    }

    // Extract metadata from the page data
    const meta = pageData?.page_data;

    // Parse HTML content if needed
    const parsedTitle = parse(meta.title);
    const parsedSubtitle = parse(meta.subtitle);

    // Use the SEO config function
    return generatePageSEO({
        title: Array.isArray(parsedTitle) ? parsedTitle.join('') : parsedTitle || 'Next.js Boilerplate',
        description: Array.isArray(parsedSubtitle) ? parsedSubtitle.join('') : parsedSubtitle || 'Learn more about our team and mission.',
        ogTitle: Array.isArray(parsedTitle) ? parsedTitle.join('') : parsedTitle,
        ogDescription: Array.isArray(parsedSubtitle) ? parsedSubtitle.join('') : parsedSubtitle,
        ogImage: pageData.images?.[0],
        keywords: 'Next.js, React, TypeScript, Boilerplate',
        url: '/',
    });
}

export default async function Home() {
    // Fetch page data on the server side
    const data: PageData | null = await getPageData();

    if (!data) {
        return <NotFound/>; // Handle error case
    }

    // Pass the fetched data to the HomeClient component
    return (
        <Suspense fallback={<LoadingSpinner/>}>
            <ViewTransition>
                {/* Dynamically render sections based on their template and order */}
                {data?.sections?.map((section: PageSection, idx: number) => {
                    const SectionComponent = sectionComponentMap[section?.section_data?.template];
                    if (!SectionComponent) return null; // Skip unknown templates
                    // Special handling for FormContact
                    if (SectionComponent === FormContact) {
                        const { padding, asModal, id, formData, form_id, career } = section.section_data || {};
                        return (
                            <FormContact
                                key={section.section_data?.id || idx}
                                padding={padding}
                                asModal={asModal}
                                id={id ? String(id) : undefined}
                                formData={section?.section_data?.form_data || ''}
                                form_id={form_id || ''}
                                career={career}
                            />
                        );
                    }
                    return (
                        <SectionComponent
                            key={section.section_data?.id || idx}
                            data={section.section_data}
                        />
                    );
                })}
            </ViewTransition>
        </Suspense>
    );
}