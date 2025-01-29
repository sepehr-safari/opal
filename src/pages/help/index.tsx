import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';

export const HelpPage = () => {
  return (
    <>
      <div className="overflow-y-auto h-full">
        <div className="p-4 border-b">
          <h4>Help Center</h4>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4">
          <div className="p-4 border rounded-md shadow-md">
            <h4 className="border-b pb-2">Using OPAL</h4>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How do I get started with OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                To get started with OPAL, visit our website at{' '}
                <a href="https://www.opalrelay.com" className="text-blue-600 underline">
                  https://www.opalrelay.com
                </a>
                . You can create an account by generating a Nostr key for a seamless and secure
                signup experience, or simply log in if you already have a Nostr Secret key. Upon
                your first login or signup, the OPAL application will ask whether you’d like to
                offer help to those in need or seek assistance yourself. Choose the option that best
                suits your situation and proceed to set up your account. During the setup, you will
                be prompted to input your name, upload a profile photo, and choose a banner photo.
                Once completed, you’ll be all set to start using OPAL.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What steps are involved in OPAL’s login process?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                The login process can be completed by authenticating with your Nostr private key.
                for reference you can visit{' '}
                <a
                  href="https://nostr.com/get-started#understanding-keys"
                  className="text-blue-600"
                >
                  https://nostr.com/get-started#understanding-keys
                </a>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How can I list a Shelter on OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                You can post housing opportunities through the “Housing” section on the dashboard.
                Simply provide the required details such as location, type of listing, and
                availability, then submit it for publishing.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How can I book a shelter on OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                To book a shelter on OPAL, begin by browsing the available housing list to find one
                that suits your needs. Once you’ve selected the shelter, click on the "Request"
                button to send a booking request to the housing agency. Upon receiving your request,
                the agency will review it and, depending on the shelter's availability, will either
                "Approve" or "Reject" your booking.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What services can I find or access using OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                OPAL connects you with housing resources and community support that cater to
                specific needs.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Does OPAL send notifications for healthcare appointments?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Yes, OPAL sends notifications based on your role and actions within the platform. If
                you are a housing agency, you will receive notifications when someone requests
                housing. If you are seeking assistance, you will be notified when your housing
                request is approved or rejected. Additionally, OPAL sends other notifications such
                as mentions, replies, reposts, and notes, keeping you updated on all relevant
                activities.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How can I update or modify my listings?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                To update an active listing, visit “Housing” in your account, select the entry you’d
                like to edit, make the necessary changes, and save your updates.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Is the OPAL platform mobile-friendly?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Yes, the OPAL’s website is fully optimized for mobile devices. It is designed to be
                responsive, meaning the layout and content automatically adjust to fit the screen
                size of your device. Whether you're accessing the site from a smartphone, tablet, or
                desktop, you'll experience seamless navigation and ease of use.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Can I schedule appointments with healthcare providers directly in OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Currently, appointment scheduling with healthcare providers is not yet implemented
                on OPAL. However, we are planning to introduce this feature in the near future to
                enhance the platform's functionality.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Is there an offline mode available in OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                At this time, an active internet connection is required to use OPAL, as the platform
                relies on Nostr relay servers to fetch and store information.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What types of filters can I use to refine my searches on OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                At the moment, the filter option is not available on OPAL. However, we are working
                on adding this feature in future updates to help refine searches more effectively.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Does OPAL allow real-time group communication?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Currently, real-time group communication is not supported on OPAL. However, we are
                planning to introduce this feature in future updates to enhance interaction and
                collaboration on the platform.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Can users report listings or messages they find inappropriate?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                At this time, the option to report inappropriate listings or messages is not
                available on OPAL. However, we are working on implementing this feature in future
                updates to ensure a safe and respectful environment for all users.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What is OPAL’s support for payments or billing?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Currently, OPAL does not support payments or billing. However, we plan to implement
                payment and billing features in upcoming versions, utilizing Nostr and the same ZAP
                technology for seamless integration.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How does OPAL help with connecting to local resources?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Currently in development, OPAL will soon offer curated connections to nearby
                healthcare providers, shelters, and other relevant services based on your location
                and preferences. This feature is currently being developed to make it easier for
                users to access essential local resources.
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="p-4 border rounded-md shadow-md">
            <h4 className="border-b pb-2">Managing Your Account</h4>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How can I copy and securely store my public and private Nostr keys?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                You can copy your public key from your profile page. To download your private key,
                click on the profile icon on the homepage, where you'll find an option to download
                your credentials as a PDF. It's important to store this PDF securely on your device.
                For added security, you may consider printing it out and storing it in a safe
                location. Losing your private key will result in the irreversible loss of access to
                your account.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What happens if I lose access to my private key?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Losing your private key means losing access to your Nostr-related data. Be sure to
                create a backup and safeguard it using secure storage methods.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How can I reset my account password?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Since OPAL uses Nostr for account authentication, there is no traditional password
                reset option. Your account is secured with your Nostr keys (public and private). If
                you lose access to your private key, unfortunately, your account cannot be
                recovered. It’s crucial to store your Nostr credentials securely to avoid losing
                access.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How do I check my connected relays?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                You can view the active relays under the “Relays” section in the profile menu. This
                section shows the relays you are connected to.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Can I update my personal profile details?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Absolutely. Navigate to the “Profile” section and click on “Edit Profile”, then you
                can edit fields such as name, about me, profile picture, and Banner, and save your
                changes.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Is it possible to deactivate my OPAL account?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Since OPAL uses Nostr for authentication, there is no direct way to deactivate your
                account in the traditional sense. Deactivation would be tied to your Nostr keys. If
                you wish to stop using OPAL, you can simply stop using your private key and ensure
                it is no longer accessible. Once the key is abandoned or lost, you won't be able to
                access your account, effectively deactivating it.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How do I permanently delete my OPAL account?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                OPAL uses Nostr for authentication, and there is no traditional method to deactivate
                or permanently delete your account. Since your account is tied to your Nostr keys,
                if you wish to stop using OPAL, you can simply stop using your private key and
                ensure it is securely stored or abandoned. Once the private key is lost or
                discarded, you effectively lose access to your account, and it becomes
                irrecoverable. Permanent deletion of your account is not possible unless the Nostr
                protocol itself offers such a mechanism in the future.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Can I switch to a different language on OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Currently, OPAL supports only English. There is no option to switch to other
                languages at the moment, but we are considering expanding language support in future
                updates.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What do I do if my account is hacked or compromised?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Since OPAL uses Nostr for authentication, if your account is compromised or your
                private key is lost, there is no way to recover or reset your account. To protect
                yourself, ensure that your private key is securely stored and never shared. If you
                suspect that your key has been exposed or compromised, it is recommended to stop
                using that key immediately. Without access to the private key, you will not be able
                to access the account. We advise taking extra care with your credentials to prevent
                unauthorized access.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Can I recover listings deleted accidentally?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Currently, OPAL does not offer the ability to recover accidentally deleted listings.
                However, we are planning to introduce a recovery feature in future updates to assist
                with this. For now, once a listing is deleted, it is permanently removed.
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="p-4 border rounded-md shadow-md">
            <h4 className="border-b pb-2">Nostr and OPAL</h4>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What role does the Nostr protocol play in OPAL’s architecture?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Nostr acts as the backbone of OPAL's decentralized architecture, facilitating secure
                and private communication between users without relying on a central authority. It
                uses distributed relays to send messages, making interactions resilient to
                censorship and increasing user control over their data. Nostr ensures that sensitive
                information remains private, while still allowing decentralized sharing of data and
                notifications across the network.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How is Nostr integrated into OPAL’s features?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Nostr is deeply integrated into OPAL’s core functionalities, driving key features
                like account authentication, encrypted messaging, and data privacy. Users
                authenticate their accounts through Nostr keys, ensuring that their identity remains
                secure. The protocol also facilitates message relaying, ensuring that communication
                between users remains private and is transmitted across multiple distributed relays,
                adding redundancy and security to the platform’s operations.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What is a Nostr relay, and why is it important?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                A Nostr relay is a lightweight server that acts as an intermediary, storing and
                forwarding messages between users on the Nostr network. It ensures that
                decentralized communication happens smoothly and securely. Relays are crucial
                because they allow for distributed message forwarding, meaning there is no single
                point of control, which enhances the platform's resistance to censorship and makes
                it more resilient to failures.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Do I need to set up my own relay to use OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                No, OPAL connects to a default set of relays to ensure that you can start using the
                platform right away without any additional configuration.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What are the advantages of using OPAL with Nostr keys?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Using Nostr keys on OPAL offers several advantages, including increased security and
                privacy. These cryptographic keys provide strong encryption, ensuring that your data
                and communications are protected. Nostr keys also offer pseudonymity, meaning you
                can interact without revealing your personal identity, which is a core feature for
                decentralized services. Moreover, Nostr keys enable seamless interoperability with
                other decentralized applications, offering a flexible and consistent experience
                across different platforms in the Nostr ecosystem.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Does OPAL comply with Nostr Improvement Proposals (NIPs)?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Yes, OPAL supports the widely adopted Nostr Improvement Proposals (NIPs) to ensure
                the platform is interoperable with other Nostr-based applications and services. By
                adhering to these proposals, OPAL maintains compatibility with the Nostr network,
                ensuring a streamlined user experience and the ability to take advantage of any
                future enhancements or features introduced by the community.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Can I access the same account on multiple Nostr-compatible clients?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Yes, one of the key advantages of Nostr is its interoperability. When you use your
                Nostr keys to log into OPAL, you can access the same account across any
                Nostr-compatible client. This ensures flexibility and seamless account management
                across platforms. However, please note that OPAL-specific content, such as housing
                listings, may not be available on other Nostr applications. Learn more about Nostr
                at{' '}
                <a href="https://nostr.com" className="text-blue-600 underline">
                  https://nostr.com
                </a>
                .
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Can OPAL users interact with content from other Nostr applications?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Yes, OPAL users can discover, reply to, or share posts created on other Nostr
                applications, enabling seamless interaction across the platform.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What resources are available for learning about the Nostr protocol?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                To better understand Nostr, its design, and its applications, you can explore the{' '}
                <a href="https://nostr-resources.com" className="text-blue-500 underline">
                  Nostr Resources Page
                </a>{' '}
                or join active developer communities on GitHub to stay updated on the latest
                improvements.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Does Nostr ensure that OPAL is censorship-resistant?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Nostr's distributed architecture provides a significant level of censorship
                resistance. By using multiple independent relays and client-verified signatures,
                OPAL maintains message integrity and allows you to bypass centralized restrictions
                on communication.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How does OPAL handle message encryption via Nostr?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                On OPAL, all private communications sent via the Nostr protocol are protected with
                end-to-end encryption. This means that the content of your private messages is
                securely encrypted before leaving your device and can only be decrypted by the
                intended recipient(s). No intermediary—whether a relay or server—has the ability to
                read or tamper with your messages. This encryption ensures robust privacy, giving
                users full control over their communications. The decentralized nature of Nostr
                further enhances the security model by eliminating centralized servers that could
                potentially compromise data.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What future Nostr integrations are planned for OPAL?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                OPAL is actively exploring exciting future Nostr integrations to further expand its
                capabilities. Planned updates include integrating live streaming data on
                decentralized relays, which would enable real-time, secure communication for things
                like events or broadcasts.
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="p-4 border rounded-md shadow-md">
            <h4 className="border-b pb-2">Rules and Policies</h4>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                How does OPAL ensure user privacy?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                OPAL follows strict privacy protocols, encrypting all personal data during
                transmission and storage. Additionally, only users with the correct Nostr private
                keys can access sensitive data.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What data does OPAL collect, and why?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                OPAL collects essential information like user preferences, service usage, and
                optional housing details to provide a tailored experience. All data is handled with
                compliance to regulatory standards.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Does OPAL comply with international data protection regulations?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Yes, OPAL adheres to data protection standards such as GDPR, HIPAA (for medical
                data), and other regional privacy laws.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Is OPAL open-source?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Yes, OPAL’s core architecture is open-source and can be audited or forked from our
                public repository. Check our GitHub page for more details.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Are there restrictions on the types of listings I can post?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Listings must comply with OPAL’s rules against discriminatory, misleading, or
                harmful content. Non-compliance will result in removal.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What policies protect against harassment?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Currently, OPAL does not include built-in harassment moderation features. However,
                we plan to implement blocking and muting in future updates to give users more
                control over their experience.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Are external service providers on OPAL vetted?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                OPAL connects to specific relays for message transmission. However, OPAL does not
                formally vet or certify external service providers, including relays. Users are
                encouraged to review and choose additional relays based on their own preferences and
                trust.
              </CollapsibleContent>
            </Collapsible>

            {/* <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                What happens if OPAL’s terms are updated?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">TODO: Add content</CollapsibleContent>
            </Collapsible> */}

            <Collapsible className="border-b py-2">
              <CollapsibleTrigger className="text-start font-bold hover:underline">
                Does OPAL support user feedback on rules?
              </CollapsibleTrigger>
              <CollapsibleContent className="text-sm">
                Absolutely! OPAL encourages a collaborative environment where users can propose
                changes or raise concerns about rules and policies. Users can submit feedback,
                suggestions, or issues through OPAL's dedicated GitHub repository. By using GitHub's
                issue tracking and discussion features, users can interact directly with the
                development team, provide input on existing rules, or propose new guidelines. This
                open-source approach ensures that the community can contribute to the evolution of
                OPAL's policies, making it a transparent and responsive platform for all users.
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </>
  );
};
